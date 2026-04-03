# PROMPT PARA ANTIGRAVITY (Gemini 3.1 Pro)
# Tarea: Construir la estructura completa del dashboard de Centrevit
# Prerequisito: Web pública (marketing) ya existe y funciona en producción

---

## CONTEXTO DEL PROYECTO

Centrevit es una clínica de bienestar en Tudela, Navarra. La web pública ya está construida
en `src/app/(marketing)/`. Tu trabajo es construir el sistema de gestión interno: el dashboard
del administrador. No tocas nada de `(marketing)/`. Cero. Ni un archivo.

Stack ya instalado y funcionando:
- Next.js 14 App Router
- TypeScript estricto
- Tailwind CSS con tokens de color custom (ver más abajo)
- Fuentes: Cormorant Garamond (--font-serif) + DM Sans (--font-sans)

Stack que vas a añadir tú:
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install resend
npm install zod
npm install date-fns
npm install recharts
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-dropdown-menu
```

---

## TOKENS DE COLOR (YA CONFIGURADOS EN tailwind.config.ts — NO MODIFICAR)

```
verde.DEFAULT     #33763D   — acentos principales, estado "confirmado"
verde.medio       #4B8B55   — hover
verde.claro       #67986B   — fondos suaves, badges
verde.oscuro      #1C3A1E   — sidebar, header del dashboard
dorado.DEFAULT    #C9A84C   — alertas suaves, estado "pendiente"
dorado.claro      #E8D9A4   — fondo de badge pendiente
crema.DEFAULT     #F7F3EA   — fondo general
crema.oscuro      #EDE5D4   — separadores, bordes
blanco            #FDFAF6   — cards, paneles
texto.DEFAULT     #1C2B1D   — texto principal
texto.muted       #5A7060   — texto secundario
```

Tipografías:
- Headings: `font-serif` (Cormorant Garamond, font-light por defecto)
- UI/labels/datos: `font-sans` (DM Sans)

---

## FILOSOFÍA DE DISEÑO DEL DASHBOARD

El dashboard sigue la misma identidad visual que la web pública pero adaptada a una interfaz
de gestión profesional. No es un panel genérico de admin con colores azules de Bootstrap.
Es una extensión coherente de Centrevit:

- Fondo general: `bg-crema` con cards en `bg-blanco`
- Sidebar: `bg-verde-oscuro` con texto blanco
- Sin bordes agresivos — solo `border-crema-oscuro`
- Tipografía serif solo para títulos de sección y números grandes de estadísticas
- Todo lo demás: DM Sans limpio, sin peso excesivo
- Densidad media — ni muy apretado ni con padding gigante
- Sin emojis, sin iconos coloridos, sin gradientes llamativos
- Iconos: solo Heroicons SVG inline (ya incluidos en el proyecto) o SVG custom minimalista
- Estados visuales por color:
  - pendiente: `bg-dorado-claro text-dorado` (amarillo suave)
  - confirmada: `bg-verde-claro/20 text-verde` (verde suave)
  - realizada: `bg-crema-oscuro text-texto-muted` (gris neutro)
  - cancelada: `bg-red-50 text-red-600` (único uso de rojo)

---

## ESTRUCTURA DE CARPETAS A CREAR

Crear exactamente este árbol. No inventar nada fuera de esto:

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx                    ← Layout con sidebar + topbar
│   │   └── admin/
│   │       ├── page.tsx                  ← Vista general (hoy, estadísticas rápidas)
│   │       ├── calendario/
│   │       │   └── page.tsx              ← Calendario semanal + vista día
│   │       ├── reservas/
│   │       │   ├── page.tsx              ← Listado de todas las reservas
│   │       │   └── [id]/
│   │       │       └── page.tsx          ← Detalle de reserva
│   │       ├── clientes/
│   │       │   ├── page.tsx              ← Listado de clientes
│   │       │   └── [id]/
│   │       │       └── page.tsx          ← Ficha técnica del cliente
│   │       ├── servicios/
│   │       │   └── page.tsx              ← Gestión de servicios y protocolos
│   │       ├── estadisticas/
│   │       │   └── page.tsx              ← Gráficas y métricas
│   │       └── caja/
│   │           └── page.tsx              ← Registro de ingresos
│   └── auth/
│       └── login/
│           └── page.tsx                  ← Login del administrador
│
├── components/
│   ├── dashboard/
│   │   ├── layout/
│   │   │   ├── DashboardSidebar.tsx      ← Navegación lateral
│   │   │   ├── DashboardTopbar.tsx       ← Barra superior con fecha y usuario
│   │   │   └── DashboardShell.tsx        ← Contenedor principal con padding
│   │   ├── ui/
│   │   │   ├── StatCard.tsx              ← Card de estadística con número grande
│   │   │   ├── StatusBadge.tsx           ← Badge de estado (pending/confirmed/done/cancelled)
│   │   │   ├── DataTable.tsx             ← Tabla reutilizable con cabecera y filas
│   │   │   ├── PageHeader.tsx            ← Título de página + descripción + acción derecha
│   │   │   ├── EmptyState.tsx            ← Estado vacío con mensaje
│   │   │   └── LoadingSkeleton.tsx       ← Skeleton de carga
│   │   ├── reservas/
│   │   │   ├── ReservaRow.tsx            ← Fila de reserva en tabla
│   │   │   ├── ReservaCard.tsx           ← Card de reserva en calendario
│   │   │   └── ReservaDetailPanel.tsx    ← Panel lateral de detalle
│   │   ├── clientes/
│   │   │   ├── ClienteRow.tsx            ← Fila de cliente en tabla
│   │   │   └── FichaTecnica.tsx          ← Ficha completa del cliente
│   │   ├── calendario/
│   │   │   ├── CalendarioSemanal.tsx     ← Grid de 7 días con citas
│   │   │   └── CalendarioDia.tsx         ← Vista detallada de un día
│   │   └── estadisticas/
│   │       ├── GraficaIngresos.tsx       ← Gráfica de línea con Recharts
│   │       └── GraficaServicios.tsx      ← Gráfica de barras por servicio
│   │
└── lib/
    ├── supabase/
    │   ├── client.ts                     ← Browser client
    │   ├── server.ts                     ← Server client
    │   └── admin.ts                      ← Service role client (solo server)
    ├── validations/
    │   └── schemas.ts                    ← Schemas Zod para todas las entidades
    └── utils.ts                          ← Ya existe, no tocar
```

---

## PASO 1 — SUPABASE MIGRATIONS

Ejecutar en el SQL Editor de Supabase en este orden exacto:

### 001_init.sql
```sql
create extension if not exists "uuid-ossp";

-- TENANTS (arquitectura multi-tenant desde el día 1)
create table public.tenants (
  id         uuid primary key default uuid_generate_v4(),
  slug       text unique not null,
  name       text not null,
  created_at timestamptz default now()
);
insert into public.tenants (slug, name) values ('centrevit', 'Centrevit');

-- SERVICIOS (configurables por el admin)
create table public.services (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references public.tenants(id) on delete cascade,
  slug            text not null,
  name            text not null,
  duration        int not null default 60,
  price           numeric(10,2),
  description     text,
  -- Protocolo de seguimiento post-tratamiento (configurable)
  followup_days   int default null,         -- días tras la sesión para hacer seguimiento
  followup_notes  text default null,        -- instrucciones internas para el seguimiento
  active          boolean default true,
  created_at      timestamptz default now(),
  unique(tenant_id, slug)
);

insert into public.services (tenant_id, slug, name, duration, followup_days, followup_notes) values
  ((select id from tenants where slug='centrevit'), 'par-biomagnetico',       'Par Biomagnético',       60, 7,  'Preguntar al cliente cómo han evolucionado la inflamación y la energía'),
  ((select id from tenants where slug='centrevit'), 'reflexologia-podal',     'Reflexología Podal',     60, 5,  'Verificar calidad del sueño y nivel de estrés post-sesión'),
  ((select id from tenants where slug='centrevit'), 'quiromasaje-integrador', 'Quiromasaje Integrador', 60, 3,  'Comprobar si persiste la tensión o hay mejoría en movilidad'),
  ((select id from tenants where slug='centrevit'), 'presoterapia-ballancer', 'Presoterapia Ballancer', 45, 4,  'Consultar sensación de ligereza en piernas y retención de líquidos'),
  ((select id from tenants where slug='centrevit'), 'manta-fhos-led',         'Manta FHOS LED',         30, 3,  'Valorar recuperación y nivel de energía post-sesión');

-- HORARIOS SEMANALES
create table public.schedules (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  day_of_week  int not null check (day_of_week between 0 and 6), -- 0=Lunes
  start_time   time not null,
  end_time     time not null,
  active       boolean default true
);

insert into public.schedules (tenant_id, day_of_week, start_time, end_time)
select t.id, d.day, s.start::time, s.end::time
from public.tenants t,
  (values (0),(1),(2),(3),(4)) as d(day),
  (values ('09:00','14:00'),('16:00','20:00')) as s(start, end)
where t.slug = 'centrevit';

-- SLOTS BLOQUEADOS (festivos, vacaciones, ausencias)
create table public.blocked_slots (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  blocked_at  timestamptz not null,
  reason      text,
  created_at  timestamptz default now()
);

-- CLIENTES
create table public.clients (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references public.tenants(id) on delete cascade,
  name            text not null,
  email           text not null,
  phone           text,
  birth_date      date,
  -- Ficha técnica
  allergies       text,           -- alergias o contraindicaciones
  medical_notes   text,           -- notas médicas relevantes
  general_notes   text,           -- notas generales del terapeuta
  source          text,           -- cómo llegó al centro (Instagram, recomendación...)
  active          boolean default true,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique(tenant_id, email)
);

-- RESERVAS
create table public.bookings (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  client_id     uuid not null references public.clients(id) on delete cascade,
  service_id    uuid not null references public.services(id) on delete restrict,
  starts_at     timestamptz not null,
  ends_at       timestamptz not null,
  status        text not null default 'pending'
                check (status in ('pending','confirmed','cancelled','done')),
  price_charged numeric(10,2),    -- precio cobrado (puede diferir del precio base)
  payment_status text default 'unpaid'
                check (payment_status in ('unpaid','paid','partial')),
  internal_notes text,
  -- Seguimiento
  followup_done  boolean default false,
  followup_date  timestamptz,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- INGRESOS (caja)
create table public.payments (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  booking_id  uuid references public.bookings(id) on delete set null,
  client_id   uuid references public.clients(id) on delete set null,
  amount      numeric(10,2) not null,
  method      text not null default 'cash'
              check (method in ('cash','card','transfer')),
  notes       text,
  paid_at     timestamptz default now(),
  created_at  timestamptz default now()
);

-- TRIGGERS updated_at
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function update_updated_at();

create trigger clients_updated_at
  before update on public.clients
  for each row execute function update_updated_at();

-- ÍNDICES
create index on public.bookings(tenant_id, starts_at);
create index on public.bookings(tenant_id, status);
create index on public.bookings(tenant_id, followup_done, followup_date);
create index on public.clients(tenant_id, email);
create index on public.payments(tenant_id, paid_at);
```

### 002_rls.sql
```sql
alter table public.tenants       enable row level security;
alter table public.services      enable row level security;
alter table public.schedules     enable row level security;
alter table public.blocked_slots enable row level security;
alter table public.clients       enable row level security;
alter table public.bookings      enable row level security;
alter table public.payments      enable row level security;

-- Público: puede leer servicios y horarios activos (para el widget de reserva de la web)
create policy "services_public_read" on public.services
  for select using (active = true);
create policy "schedules_public_read" on public.schedules
  for select using (active = true);

-- Público: puede crear reservas y clientes (formulario web)
create policy "bookings_public_insert" on public.bookings
  for insert with check (true);
create policy "clients_public_insert" on public.clients
  for insert with check (true);

-- Admin: acceso total a todo (solo usuarios autenticados via Supabase Auth)
create policy "admin_bookings"      on public.bookings      for all using (auth.role() = 'authenticated');
create policy "admin_clients"       on public.clients       for all using (auth.role() = 'authenticated');
create policy "admin_payments"      on public.payments      for all using (auth.role() = 'authenticated');
create policy "admin_blocked"       on public.blocked_slots for all using (auth.role() = 'authenticated');
create policy "admin_schedules"     on public.schedules     for all using (auth.role() = 'authenticated');
create policy "admin_services_all"  on public.services      for all using (auth.role() = 'authenticated');
create policy "admin_tenants"       on public.tenants       for select using (auth.role() = 'authenticated');
```

---

## PASO 2 — CLIENTES SUPABASE

### src/lib/supabase/client.ts
```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### src/lib/supabase/server.ts
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options))
          } catch {}
        },
      },
    }
  )
}
```

### src/lib/supabase/admin.ts
```ts
// SOLO usar en server-side — nunca exponer al cliente
import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
```

---

## PASO 3 — VARIABLES DE ENTORNO

Crear `.env.local` (nunca commitear):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=javierxy@hotmail.com
```

---

## PASO 4 — MIDDLEWARE DE AUTENTICACIÓN

### src/middleware.ts
```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Proteger todas las rutas /admin/*
  if (pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Redirigir a /admin si ya está autenticado e intenta ir al login
  if (pathname.startsWith('/auth/login') && user) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login'],
}
```

---

## PASO 5 — SCHEMAS ZOD

### src/lib/validations/schemas.ts
```ts
import { z } from 'zod'

export const createBookingSchema = z.object({
  client_name:  z.string().min(2, 'Nombre requerido').max(100).trim(),
  client_email: z.string().email('Email inválido').toLowerCase().trim(),
  client_phone: z.string().regex(/^[0-9\s\+\-]{9,15}$/, 'Teléfono inválido').optional(),
  service_id:   z.string().uuid('Servicio inválido'),
  starts_at:    z.string().datetime(),
  notes:        z.string().max(500).optional(),
})

export const updateBookingSchema = z.object({
  status:        z.enum(['pending', 'confirmed', 'cancelled', 'done']).optional(),
  internal_notes: z.string().max(1000).optional(),
  price_charged: z.number().positive().optional(),
  payment_status: z.enum(['unpaid', 'paid', 'partial']).optional(),
  followup_done: z.boolean().optional(),
})

export const createClientSchema = z.object({
  name:           z.string().min(2).max(100).trim(),
  email:          z.string().email().toLowerCase().trim(),
  phone:          z.string().optional(),
  birth_date:     z.string().optional(),
  allergies:      z.string().max(1000).optional(),
  medical_notes:  z.string().max(2000).optional(),
  general_notes:  z.string().max(2000).optional(),
  source:         z.string().max(100).optional(),
})

export const createServiceSchema = z.object({
  name:           z.string().min(2).max(100).trim(),
  slug:           z.string().regex(/^[a-z0-9-]+$/).min(2).max(50),
  duration:       z.number().int().positive().max(480),
  price:          z.number().positive().optional(),
  description:    z.string().max(2000).optional(),
  followup_days:  z.number().int().min(1).max(365).optional(),
  followup_notes: z.string().max(500).optional(),
})

export const createPaymentSchema = z.object({
  booking_id: z.string().uuid().optional(),
  client_id:  z.string().uuid().optional(),
  amount:     z.number().positive(),
  method:     z.enum(['cash', 'card', 'transfer']),
  notes:      z.string().max(500).optional(),
  paid_at:    z.string().datetime().optional(),
})

export type CreateBookingInput  = z.infer<typeof createBookingSchema>
export type UpdateBookingInput  = z.infer<typeof updateBookingSchema>
export type CreateClientInput   = z.infer<typeof createClientSchema>
export type CreateServiceInput  = z.infer<typeof createServiceSchema>
export type CreatePaymentInput  = z.infer<typeof createPaymentSchema>
```

---

## PASO 6 — LAYOUT DEL DASHBOARD

### src/app/(dashboard)/layout.tsx
```tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/layout/DashboardSidebar'
import { DashboardTopbar } from '@/components/dashboard/layout/DashboardTopbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="flex h-screen bg-crema overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardTopbar user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### src/components/dashboard/layout/DashboardSidebar.tsx

Sidebar fijo a la izquierda, fondo `bg-verde-oscuro`, ancho `w-60`.

Estructura visual:
1. Logo Centrevit en la parte superior (usar `/public/logo.png` con `next/image`, blanco)
2. Línea separadora `border-blanco/10`
3. Navegación principal con estos ítems en orden:
   - Vista general → `/admin`
   - Calendario → `/admin/calendario`
   - Reservas → `/admin/reservas`
   - Clientes → `/admin/clientes`
   - Servicios → `/admin/servicios`
   - Estadísticas → `/admin/estadisticas`
   - Caja → `/admin/caja`
4. Abajo del todo: nombre del usuario + botón de cerrar sesión

Estilo de los ítems de nav:
- Inactivo: `text-blanco/60 hover:text-blanco hover:bg-blanco/5`
- Activo: `text-blanco bg-blanco/10 border-l-2 border-dorado`
- Usar `usePathname()` de Next.js para detectar ruta activa
- Cada ítem: icono SVG (16px) + label texto sans

### src/components/dashboard/layout/DashboardTopbar.tsx

Barra horizontal superior, fondo `bg-blanco`, `border-b border-crema-oscuro`, altura `h-14`.

Contenido:
- Izquierda: fecha actual formateada en español (ej: "Jueves, 2 de abril de 2026") — usar date-fns/locale/es
- Derecha: nombre del usuario logado + badge "Admin"

---

## PASO 7 — PÁGINA PRINCIPAL DEL DASHBOARD

### src/app/(dashboard)/admin/page.tsx

Server Component. Hace 4 queries en paralelo con `Promise.all` a Supabase:
1. Reservas de hoy (estado != cancelled)
2. Reservas pendientes de confirmar (status = 'pending')
3. Total de clientes activos
4. Seguimientos pendientes (followup_done = false AND followup_date <= now())

Layout de la página:

**Sección 1 — StatCards (grid 4 columnas)**
Usar componente `StatCard` con:
- "Citas hoy" — número grande serif + lista de servicios abreviada
- "Pendientes de confirmar" — número en dorado si > 0
- "Total clientes" — número
- "Seguimientos pendientes" — número en dorado si > 0

**Sección 2 — Citas de hoy (tabla)**
Columnas: Hora | Cliente | Servicio | Estado | Acciones
Acciones: botón "Confirmar" (si pending) + botón "Ver detalle"

**Sección 3 — Seguimientos pendientes**
Lista compacta de clientes con seguimiento vencido o próximo:
- Nombre del cliente
- Servicio recibido
- Fecha de la sesión
- Días de seguimiento configurados
- Botón "Marcar como realizado"

### src/components/dashboard/ui/StatCard.tsx
```tsx
interface StatCardProps {
  label: string
  value: number | string
  alert?: boolean       // si true y value > 0, colorear en dorado
  sublabel?: string
}
```
Diseño: `bg-blanco border border-crema-oscuro rounded-lg p-5`
- Label: `text-xs font-sans text-texto-muted uppercase tracking-wide`
- Value: `text-4xl font-serif font-light` (dorado si alert && value > 0, else texto)
- Sublabel: `text-xs text-texto-muted mt-1`

### src/components/dashboard/ui/StatusBadge.tsx
```tsx
type Status = 'pending' | 'confirmed' | 'done' | 'cancelled'

const labels: Record<Status, string> = {
  pending:   'Pendiente',
  confirmed: 'Confirmada',
  done:      'Realizada',
  cancelled: 'Cancelada',
}

const styles: Record<Status, string> = {
  pending:   'bg-dorado-claro text-dorado',
  confirmed: 'bg-verde-claro/20 text-verde',
  done:      'bg-crema-oscuro text-texto-muted',
  cancelled: 'bg-red-50 text-red-600',
}
```
Tamaño: `text-xs px-2.5 py-1 rounded-full font-sans font-medium`

---

## PASO 8 — PÁGINA DE RESERVAS

### src/app/(dashboard)/admin/reservas/page.tsx

Server Component con searchParams para filtros.

Filtros (URL params, no estado):
- `status`: todas | pending | confirmed | done | cancelled
- `fecha`: YYYY-MM-DD (filtra por día)
- `page`: número de página (20 por página)

Layout:
1. `PageHeader` con título "Reservas" + botón "Nueva reserva" (abre modal)
2. Barra de filtros: tabs de estado + input de fecha
3. Tabla con columnas: Fecha/Hora | Cliente | Servicio | Estado | Pago | Acciones
4. Paginación simple (anterior / siguiente)

Acciones por fila según estado:
- pending → "Confirmar" (Server Action) + "Cancelar" + "Ver"
- confirmed → "Marcar realizada" + "Cancelar" + "Ver"
- done → "Ver"
- cancelled → "Ver"

Al confirmar una reserva: actualizar status a 'confirmed' + (Claude Code añadirá el email después).

### src/app/(dashboard)/admin/reservas/[id]/page.tsx

Server Component. Carga la reserva completa con join a cliente y servicio.

Layout en dos columnas:
- Izquierda (60%): datos completos de la reserva, historial de estados, notas internas
- Derecha (40%): datos del cliente (nombre, email, teléfono), enlace a su ficha, acciones rápidas

---

## PASO 9 — CALENDARIO

### src/app/(dashboard)/admin/calendario/page.tsx

Client Component ('use client') por necesidad de estado interactivo.

Estado local (useState):
- `vista`: 'semana' | 'dia'
- `fechaActual`: Date (semana o día seleccionado)

**Vista semana:**
- Grid CSS de 7 columnas, Lun-Dom
- Cabecera: día de la semana + fecha del día
- Hoy: columna con fondo `bg-verde/5` + cabecera en `text-verde`
- Citas: cards compactas con color según estado (StatusBadge colors), hora + nombre del cliente
- Clic en card: abre modal con detalle de la reserva
- Navegación: botones "< Semana anterior" y "Semana siguiente >"
- Botón "Hoy" para volver a la semana actual

**Vista día:**
- Date picker simple (input type="date")
- Lista cronológica de citas con más detalle
- Mismos colores por estado

Transición entre vistas: dos botones toggle con aspecto de tab.

### src/components/dashboard/calendario/CalendarioSemanal.tsx

Recibe: `bookings: Booking[]`, `weekStart: Date`, callbacks de navegación.

Calcula los 7 días de la semana y filtra las reservas por día.

Cada tarjeta de cita:
```
[COLOR_BAR] 10:30
            María García
            Reflexología Podal
```
Altura mínima de tarjeta: `min-h-[52px]`
Si hay > 3 citas en un día: mostrar las 3 primeras + "+N más"

---

## PASO 10 — CLIENTES

### src/app/(dashboard)/admin/clientes/page.tsx

Server Component con searchParams.

Filtros: búsqueda por nombre/email (query param `q`)
Orden: por defecto más recientes primero

Layout:
1. `PageHeader` "Clientes" + total de clientes + botón "Nuevo cliente"
2. Input de búsqueda
3. Tabla: Nombre | Email | Teléfono | Fecha alta | Nº sesiones | Última visita | Acciones

### src/app/(dashboard)/admin/clientes/[id]/page.tsx

**FICHA TÉCNICA COMPLETA** — Server Component.

Layout en tabs (Radix UI Tabs):

**Tab 1 — Datos personales**
- Nombre completo, email, teléfono, fecha de nacimiento
- Cómo llegó al centro (source)
- Fecha de alta
- Botón "Editar datos"

**Tab 2 — Ficha técnica**
- Alergias y contraindicaciones (texto editable, guardar con Server Action)
- Notas médicas relevantes
- Notas generales del terapeuta
- Campos de texto con botón "Guardar" por sección

**Tab 3 — Historial de sesiones**
- Tabla cronológica de todas las reservas del cliente
- Columnas: Fecha | Servicio | Estado | Importe | Notas internas
- Total de sesiones + total facturado

**Tab 4 — Seguimientos**
- Lista de seguimientos realizados y pendientes por sesión
- Cada item: fecha sesión | servicio | días seguimiento configurados | ¿realizado? | notas
- Botón "Marcar como realizado" con campo de notas opcional

### src/components/dashboard/clientes/FichaTecnica.tsx

Client Component. Gestiona el estado local del formulario de edición de la ficha.
Usa Server Actions para guardar cambios en Supabase.
Mostrar feedback visual de guardado (loading state + confirmación "Guardado").

---

## PASO 11 — SERVICIOS

### src/app/(dashboard)/admin/servicios/page.tsx

Client Component.

Permite al admin gestionar los servicios del centro:

**Lista de servicios activos:**
Tabla con: Nombre | Duración | Precio | Días seguimiento | Activo | Acciones

**Modal "Nuevo servicio" / "Editar servicio"** (Radix UI Dialog):
Formulario completo con todos los campos:
- Nombre del servicio
- Slug (auto-generado desde el nombre, editable)
- Duración (minutos) — input numérico
- Precio (€) — input numérico opcional
- Descripción
- **Protocolo de seguimiento:**
  - "¿Activar seguimiento post-sesión?" — toggle
  - "Días tras la sesión para hacer seguimiento" — input numérico
  - "Instrucciones para el seguimiento" — textarea
    (ej: "Preguntar al cliente cómo ha evolucionado la inflamación")
- Estado: activo / inactivo

Validación con Zod (`createServiceSchema`) antes de enviar.
Server Action para crear/actualizar en Supabase.

---

## PASO 12 — ESTADÍSTICAS

### src/app/(dashboard)/admin/estadisticas/page.tsx

Server Component. Carga datos del mes actual y del anterior para comparativa.

Queries:
1. Ingresos por día (últimos 30 días)
2. Reservas por servicio (últimas 8 semanas)
3. Clientes nuevos por semana (último mes)
4. Tasa de cancelación del mes

Layout:
1. **Selector de período** (este mes | mes anterior | últimos 3 meses) — query param
2. **StatCards resumen:** Ingresos totales | Sesiones realizadas | Clientes nuevos | Tasa cancelación
3. **Gráfica de ingresos** (línea, Recharts) — ancho completo
4. **Grid 2 columnas:**
   - Gráfica de sesiones por servicio (barras horizontales)
   - Tabla top clientes por nº sesiones

Todas las gráficas con colores de la paleta:
- Verde `#33763D` para datos principales
- Dorado `#C9A84C` para datos secundarios
- Sin colores externos

### src/components/dashboard/estadisticas/GraficaIngresos.tsx

Client Component ('use client').
Recibe: `data: { date: string; amount: number }[]`
Usar Recharts `LineChart` con `ResponsiveContainer`.
Eje X: fechas formateadas con date-fns
Eje Y: € con 2 decimales
Tooltip custom con la paleta Centrevit.

### src/components/dashboard/estadisticas/GraficaServicios.tsx

Client Component ('use client').
Recibe: `data: { service: string; count: number; revenue: number }[]`
Usar Recharts `BarChart` horizontal.

---

## PASO 13 — CAJA

### src/app/(dashboard)/admin/caja/page.tsx

Server Component con searchParams para filtro de fecha.

**Resumen del período:**
- Total ingresos (efectivo / tarjeta / transferencia por separado)
- Número de pagos registrados
- Ticket medio

**Tabla de pagos:**
Columnas: Fecha | Cliente | Servicio | Importe | Método | Notas | Acciones

**Modal "Registrar pago"** (Radix UI Dialog):
- Cliente (búsqueda/select)
- Reserva asociada (opcional)
- Importe
- Método: Efectivo | Tarjeta | Transferencia
- Notas
- Fecha (por defecto hoy)

Server Action para insertar en `payments` y actualizar `payment_status` de la reserva si aplica.

---

## PASO 14 — LOGIN

### src/app/auth/login/page.tsx

Página centrada, fondo `bg-verde-oscuro`.

Layout:
- Card central `bg-blanco` con `max-w-sm`, `rounded-xl`, `shadow-xl`
- Logo Centrevit arriba (blanco sobre verde oscuro, antes del card)
- Dentro del card:
  - Título serif "Acceso al panel"
  - Subtítulo muted "Solo personal autorizado"
  - Formulario: email + password
  - Botón "Entrar" — `bg-verde text-blanco hover:bg-verde-medio`
  - Manejo de error (credenciales incorrectas): mensaje bajo el formulario en rojo suave

Client Component. Usa `createClient()` del browser client para `supabase.auth.signInWithPassword()`.
Tras login exitoso: `router.push('/admin')`.

---

## PASO 15 — HEADERS DE SEGURIDAD

### next.config.ts (actualizar el existente, no reemplazar)

Añadir headers de seguridad HTTP:
```ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options',           value: 'DENY' },
        { key: 'X-Content-Type-Options',    value: 'nosniff' },
        { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ]
},
```

---

## PASO 16 — SEO TÉCNICO

### public/robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Sitemap: https://centrevit.es/sitemap.xml
```

### public/sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://centrevit.es/</loc><priority>1.0</priority></url>
  <url><loc>https://centrevit.es/tratamientos</loc><priority>0.8</priority></url>
  <url><loc>https://centrevit.es/tratamientos/par-biomagnetico</loc><priority>0.9</priority></url>
  <url><loc>https://centrevit.es/tratamientos/reflexologia-podal</loc><priority>0.9</priority></url>
  <url><loc>https://centrevit.es/tratamientos/quiromasaje-integrador</loc><priority>0.9</priority></url>
  <url><loc>https://centrevit.es/tratamientos/presoterapia-ballancer</loc><priority>0.9</priority></url>
  <url><loc>https://centrevit.es/tratamientos/manta-fhos-led</loc><priority>0.9</priority></url>
  <url><loc>https://centrevit.es/centrevit</loc><priority>0.7</priority></url>
  <url><loc>https://centrevit.es/reservar</loc><priority>0.8</priority></url>
  <url><loc>https://centrevit.es/contacto</loc><priority>0.6</priority></url>
</urlset>
```

---

## REGLAS QUE NUNCA ROMPES

- Todo el texto en español
- Nunca `<img>` — siempre `next/image`
- Nunca hardcodear colores — siempre tokens de Tailwind
- Nunca Lorem Ipsum ni texto de relleno
- Nunca exponer `SUPABASE_SERVICE_ROLE_KEY` al cliente — solo en server
- Nunca skipear validación Zod antes de tocar la DB
- Mobile first — el dashboard también debe funcionar en tablet (768px+)
- No instalar librerías no listadas en este prompt
- No tocar nada en `src/app/(marketing)/`
- No tocar nada en `src/components/marketing/`

---

## ENTREGA

Cuando termines:
1. Ejecutar `npm run build` — debe compilar sin errores TypeScript
2. Listar todos los archivos creados
3. Indicar qué partes quedan como "shell" (estructura sin lógica real) para que Claude Code las complete
4. Confirmar que el middleware protege `/admin/*` correctamente
