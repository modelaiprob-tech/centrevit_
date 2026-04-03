@AGENTS.md

---

# CENTREVIT — Estado del proyecto y guía para Claude

> Última actualización: 2026-04-03

---

## ARQUITECTURA

### Stack
- **Framework:** Next.js 16.2.1 — App Router, React Server Components, Server Actions
- **Auth:** Supabase Auth únicamente (no se usa el cliente Supabase para datos)
- **Base de datos:** PostgreSQL 18 local (Windows service `postgresql-x64-18`) vía `pg` Pool
- **ORM:** Ninguno — SQL puro con `pool.query()`
- **Emails:** Resend (inicialización lazy con `getResend()` — no en module-level)
- **UI:** Tailwind CSS + Radix UI (Dialog, Tabs)
- **Deploy objetivo:** Vercel + PostgreSQL en producción

### Patrón de datos crítico
```
Supabase → SOLO para auth.getUser() en requireAuth()
pg Pool  → TODOS los datos (bookings, clients, services, payments, etc.)
```

**Nunca mezclar:** No usar el cliente Supabase para queries de datos. Siempre `pool.query()`.

### Estructura de rutas
```
src/app/
  (marketing)/          → Páginas públicas con Navbar + Footer
  (dashboard)/
    layout.tsx          → Solo sidebar, SIN topbar (topbar solo en /admin home)
    admin/
      page.tsx          → Dashboard home — TIENE DashboardTopbar
      reservas/         → CRUD reservas
      clientes/         → CRUD clientes
      caja/             → Pagos e ingresos
      estadisticas/     → Gráficas y métricas
      servicios/        → Gestión de servicios
      calendario/       → Vista mensual/semanal/diaria (client component)
      settings/         → Configuración del centro
  api/
    bookings/           → GET autenticado para el calendario (client component no puede usar pg)
    reservas/           → POST público para reservas web (con rate limiting)
    cron/recordatorios/ → Cron job de emails (autenticado con CRON_SECRET)
  auth/
    login/              → Página login
    signout/            → Ruta de logout
```

### Pool de conexiones
```typescript
// src/lib/db.ts — singleton con cache en global para HMR dev
const pool = global.pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL })
```

### Middleware / Proxy
- `src/proxy.ts` — protege `/admin/*` y redirige `/auth/login` si ya autenticado
- (Next.js 16 renombró `middleware.ts` → `proxy.ts` con `export function proxy()`)

---

## ESTADO DE CADA PÁGINA

### ✅ `/admin` — Dashboard home
- Citas de hoy, pendientes de confirmar, total clientes, seguimientos pendientes
- Tabla de citas del día con link a detalle
- Botón "Marcar realizado" en seguimientos → `marcarSeguimientoRealizado` action
- **Tiene** `DashboardTopbar` (fecha + usuario + badge Admin)

### ✅ `/admin/reservas` — Lista de reservas
- Filtros por estado y fecha
- Botones Confirmar / Marcar realizada / Cancelar por fila
- Modal "Nueva reserva" → POST `/api/reservas`
- Paginación: hardcodeada a 20 resultados (sin paginación real — pendiente)

### ✅ `/admin/reservas/[id]` — Detalle reserva
- Datos completos de la reserva y cliente
- Botones Confirmar / Cancelar / Marcar realizada según estado
- Modal "Editar reserva" → `reprogramarReserva` action (con comprobación de conflictos)
- Form de notas internas → `actualizarNotasInternas`

### ✅ `/admin/clientes` — Lista de clientes
- Búsqueda por nombre o email (ILIKE con $1 para ambas condiciones)
- Modal "Nuevo cliente" → `crearCliente` action → redirect a ficha
- Contador de sesiones por cliente

### ✅ `/admin/clientes/[id]` — Ficha cliente
- Tabs: Datos personales / Ficha técnica / Historial sesiones / Seguimientos
- Ficha técnica guarda alergias, notas médicas, notas generales → `actualizarFichaTecnica`
- Seguimientos: botón "Marcar realizado" por sesión

### ✅ `/admin/caja` — Caja e ingresos
- Filtro por mes
- Estadísticas: total, número de pagos, ticket medio
- Modal "Registrar pago" → `registrarPago` action
- Tabla de pagos del mes con cliente, servicio/concepto, método

### ✅ `/admin/estadisticas` — Estadísticas
- Filtro por periodo: este mes / mes anterior / últimos 3 meses
- Stats: ingresos, sesiones realizadas, nuevos clientes, tasa cancelación
- Gráfica de ingresos por día (recharts)
- Gráfica de sesiones por servicio (recharts)
- Tabla top clientes

### ✅ `/admin/servicios` — Servicios
- Tabla de servicios con toggle activo/inactivo
- Modal "Nuevo servicio" → `crearServicio` action (genera slug automático)
- Modal "Editar" por fila → `editarServicio` action

### ✅ `/admin/calendario` — Calendario
- Vistas: mes / semana / día
- Fetch client-side a `/api/bookings` (necesario porque es 'use client')
- Navegación entre períodos

### ⚠️ `/admin/settings` — Configuración
- **Datos del centro:** lee/escribe en tabla `tenants` → `guardarDatosCentro`
- **Horarios:** lee/escribe en tabla `business_hours` → `guardarHorarios`
- **Notificaciones:** guarda flags en `tenants.settings` (JSON) → `guardarPreferencias`
- ⚠️ Requiere que `tenants` tenga columnas: `phone`, `email`, `address`, `settings` (JSONB)
- ⚠️ Requiere que `business_hours` tenga columna `is_open` (boolean)
- Si las columnas no existen en DB, la página crasheará — verificar schema

---

## VARIABLES DE ENTORNO NECESARIAS

```bash
# PostgreSQL local
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/centrevit

# Supabase (solo auth)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Emails
RESEND_API_KEY=...
ADMIN_EMAIL=admin@centrevit.es

# Cron
CRON_SECRET=...

# App
NEXT_PUBLIC_SITE_URL=https://centrevit.es
```

---

## BUGS CONOCIDOS Y PENDIENTES

### 🔴 CRÍTICOS (verificar antes de producción)

1. **Settings: columnas posiblemente faltantes en DB**
   - `guardarDatosCentro` asume columnas `phone`, `email`, `address` en tabla `tenants`
   - `guardarHorarios` asume columna `is_open` en tabla `business_hours`
   - `guardarPreferencias` asume columna `settings` JSONB en `tenants`
   - **Acción:** Verificar con `\d tenants` y `\d business_hours` en psql y migrar si faltan

2. **Rate limiting no funciona en multi-instancia**
   - El rate limiting usa Map en memoria (con limpieza lazy de expirados)
   - En Vercel con múltiples instancias, cada una tiene su propio Map
   - **Solución:** Upstash Redis (`@upstash/ratelimit`) antes de producción

3. **Sin protección CSRF en /api/reservas**
   - Endpoint público POST sin CSRF token
   - El rate limiting mitiga el abuso pero no el CSRF
   - **Solución:** Verificar header `Origin` o añadir honeypot

### 🟡 IMPORTANTES

4. **Paginación en /admin/reservas**
   - Query hardcodeada con `LIMIT 20`, botones deshabilitados
   - **Acción:** `OFFSET $n` con `searchParams.page`

5. **Sin índices DB documentados**
   - Queries frecuentes sobre `starts_at`, `status`, `client_id` sin índices confirmados
   - **Acción:**
     ```sql
     CREATE INDEX IF NOT EXISTS idx_bookings_starts_at ON bookings(starts_at);
     CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
     CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id);
     CREATE INDEX IF NOT EXISTS idx_payments_paid_at ON payments(paid_at);
     CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(tenant_id, email);
     ```

6. **Tipos TypeScript: uso de `any`**
   - Todas las páginas usan `(reserva: any)`, `(cliente: any)`, etc.
   - **Acción:** Definir interfaces en `src/lib/types.ts`

7. **Validación de pagos sin cliente ni reserva**
   - Se puede crear un pago sin `client_id` ni `booking_id`
   - **Acción:** Añadir `.refine()` en `createPaymentSchema`

8. **Email admin sin fallback**
   - `const ADMIN_EMAIL = process.env.ADMIN_EMAIL!` crashea si no definida
   - **Acción:** `?? ''` y skip del email si vacío

### 🟢 BAJO (deuda técnica)

9. Calendario sin cache local — refetch en cada cambio de vista
10. CSP con `unsafe-inline`/`unsafe-eval` — necesario para Next.js dev, mejorable con nonces en prod
11. Paginación en /admin/clientes también limitada (sin LIMIT explícito, carga todos)

---

## SCHEMA DE BASE DE DATOS (resumen)

```sql
tenants          -- Centro (slug='centrevit')
clients          -- Clientes (unique: tenant_id + email)
services         -- Tratamientos (duration en minutos, followup_days)
bookings         -- Reservas (status: pending|confirmed|done|cancelled)
payments         -- Pagos (method: cash|card|transfer)
business_hours   -- Horarios por día de la semana (day_of_week 0=dom..6=sab)
```

Relaciones clave:
- `bookings.client_id → clients.id`
- `bookings.service_id → services.id`
- `payments.booking_id → bookings.id` (opcional)
- `payments.client_id → clients.id` (opcional)

---

## INSTRUCCIONES PARA PRÓXIMAS SESIONES

### Antes de tocar código
1. Leer `node_modules/next/dist/docs/` — Next.js 16 tiene breaking changes respecto al training data
2. `params` y `searchParams` son **Promises** — siempre `const { id } = await params`
3. El middleware está en `src/proxy.ts`, NO en `middleware.ts`
4. Resend: usar siempre `getResend()` (lazy) — nunca `new Resend()` en module level
5. Layouts: `(dashboard)/layout.tsx` NO tiene topbar — el topbar solo está en `admin/page.tsx`

### Patrón de server action
```typescript
'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import pool from '@/lib/db'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return user
}

export async function miAction(id: string, formData: FormData) {
  await requireAuth()
  await pool.query(`UPDATE ... WHERE id = $1`, [id])
  revalidatePath('/admin/pagina')
  revalidatePath(`/admin/pagina/${id}`) // también el detalle si existe
}
```

### Patrón de modal client con server action
```typescript
'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const router = useRouter()
const [isPending, startTransition] = useTransition()

startTransition(async () => {
  try {
    await serverAction(data)
    setOpen(false)
    router.refresh() // SIEMPRE después de mutación exitosa
  } catch (err: any) {
    setError(err?.message || 'Error')
  }
})
```

### Patrón de query con JOIN anidado
```sql
-- json_build_object para preservar forma anidada en el frontend
SELECT b.*,
  json_build_object('name', c.name, 'email', c.email) AS clients,
  json_build_object('name', s.name, 'duration', s.duration) AS services
FROM bookings b
JOIN clients c ON b.client_id = c.id
JOIN services s ON b.service_id = s.id
WHERE b.tenant_id = $1  -- SIEMPRE filtrar por tenant
```

---

## LO QUE FALTA POR HACER

### Funcionalidad pendiente
- [ ] Paginación real en `/admin/reservas` y `/admin/clientes`
- [ ] Verificar y migrar columnas faltantes en `tenants` y `business_hours` para settings
- [ ] Vista de detalle de pago (editar/eliminar)
- [ ] Exportar datos (CSV de pagos, lista de clientes)
- [ ] Búsqueda global en el panel
- [ ] Widget de reservas públicas que respete horarios de `business_hours`

### Infraestructura (antes de producción)
- [ ] Upstash Redis para rate limiting
- [ ] Crear índices DB en producción
- [ ] Configurar variables de entorno en Vercel
- [ ] Configurar cron en `vercel.json` con `CRON_SECRET`
- [ ] Migrar PostgreSQL local a servicio cloud (Railway, Supabase DB, Neon)

### Calidad de código
- [ ] Definir tipos TypeScript en `src/lib/types.ts` (eliminar `any`)
- [ ] Validación cruzada en `createPaymentSchema`
- [ ] Fallback en `ADMIN_EMAIL`
