# PROMPT PARA CLAUDE CODE
# Centrevit — Sistema de gestión: lógica real, seguridad y automatizaciones
# Prerequisito: Antigravity ya ha generado la estructura, el proyecto compila

---

## TU ROL

Eres un ingeniero de software senior. Antigravity ha construido la estructura del dashboard:
rutas, layouts, componentes UI, migraciones SQL y schemas Zod. Todo compila. Pero la lógica
real no existe todavía — hay shells, placeholders y comentarios TODO.

Tu trabajo es hacer que el sistema funcione de verdad:
- API routes con validación y protección completa
- Server Actions robustas
- Sistema de emails con Resend
- Automatizaciones de recordatorios
- Seguridad: protección contra SQL injection, XSS, CSRF, prompt injection, rate limiting
- Performance: queries eficientes, caché correcta, sin waterfalls innecesarios

No reescribas lo que Antigravity ya hizo bien. Completa, refuerza y añade lo que falta.

---

## CONTEXTO TÉCNICO

```
Stack: Next.js 14 App Router, TypeScript estricto, Tailwind CSS, Supabase, Resend, Zod, date-fns
Ruta del proyecto: src/app/(dashboard)/admin/*
Auth: Supabase Auth (email/password, un único usuario admin)
DB: Supabase PostgreSQL con RLS activo
Emails: Resend
Validación: Zod (schemas ya definidos en src/lib/validations/schemas.ts)
```

Variables de entorno disponibles:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY      ← nunca al cliente
RESEND_API_KEY
NEXT_PUBLIC_SITE_URL
ADMIN_EMAIL
```

---

## TAREA 1 — API ROUTE: CREAR RESERVA (web pública)

### src/app/api/reservas/route.ts

Este endpoint lo llama el formulario de la web pública. Es el único endpoint público.
Requiere protección máxima porque recibe datos de usuarios anónimos.

```ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createBookingSchema } from '@/lib/validations/schemas'
import { sendBookingConfirmationToClient, sendNewBookingAlertToAdmin } from '@/lib/emails'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  // 1. Rate limiting: máximo 5 reservas por IP en 10 minutos
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await rateLimit(ip)
  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Espera unos minutos.' },
      { status: 429 }
    )
  }

  // 2. Parsear y validar con Zod — nunca confiar en el input del cliente
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Formato de solicitud inválido.' }, { status: 400 })
  }

  const parsed = createBookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos.', details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { client_name, client_email, client_phone, service_id, starts_at, notes } = parsed.data

  // 3. Usar admin client (service role) para operaciones de escritura
  const supabase = createAdminClient()

  // 4. Verificar que el servicio existe y está activo
  const { data: service } = await supabase
    .from('services')
    .select('id, name, duration, tenant_id')
    .eq('id', service_id)
    .eq('active', true)
    .single()

  if (!service) {
    return NextResponse.json({ error: 'Servicio no disponible.' }, { status: 400 })
  }

  // 5. Verificar que el slot no está ya ocupado
  const start = new Date(starts_at)
  const end = new Date(start.getTime() + service.duration * 60 * 1000)

  const { data: conflict } = await supabase
    .from('bookings')
    .select('id')
    .eq('tenant_id', service.tenant_id)
    .neq('status', 'cancelled')
    .lt('starts_at', end.toISOString())
    .gt('ends_at', start.toISOString())
    .limit(1)
    .single()

  if (conflict) {
    return NextResponse.json(
      { error: 'Ese horario ya no está disponible. Por favor elige otro.' },
      { status: 409 }
    )
  }

  // 6. Upsert cliente (si ya existe por email, reutilizar)
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .upsert(
      { tenant_id: service.tenant_id, name: client_name, email: client_email, phone: client_phone },
      { onConflict: 'tenant_id,email', ignoreDuplicates: false }
    )
    .select('id')
    .single()

  if (clientError || !client) {
    console.error('Error creando cliente:', clientError)
    return NextResponse.json({ error: 'Error al procesar la solicitud.' }, { status: 500 })
  }

  // 7. Crear la reserva
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      tenant_id:  service.tenant_id,
      client_id:  client.id,
      service_id: service.id,
      starts_at:  start.toISOString(),
      ends_at:    end.toISOString(),
      status:     'pending',
      internal_notes: notes ?? null,
    })
    .select('id')
    .single()

  if (bookingError || !booking) {
    console.error('Error creando reserva:', bookingError)
    return NextResponse.json({ error: 'Error al crear la reserva.' }, { status: 500 })
  }

  // 8. Enviar emails (no bloquear la respuesta si fallan)
  await Promise.allSettled([
    sendBookingConfirmationToClient({ clientName: client_name, clientEmail: client_email, serviceName: service.name, startsAt: start }),
    sendNewBookingAlertToAdmin({ clientName: client_name, serviceName: service.name, startsAt: start }),
  ])

  return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 })
}
```

---

## TAREA 2 — RATE LIMITING

### src/lib/rate-limit.ts

Implementar rate limiting en memoria (para desarrollo) con interfaz compatible con Redis para producción:

```ts
// Rate limiting simple en memoria — reemplazable por Upstash Redis en producción
const requests = new Map<string, { count: number; resetAt: number }>()

export async function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 10 * 60 * 1000 // 10 minutos
): Promise<{ success: boolean; remaining: number }> {
  const now = Date.now()
  const entry = requests.get(identifier)

  if (!entry || now > entry.resetAt) {
    requests.set(identifier, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 }
  }

  entry.count++
  return { success: true, remaining: limit - entry.count }
}
```

---

## TAREA 3 — SISTEMA DE EMAILS

### src/lib/emails/index.ts

Todos los emails de la aplicación centralizados aquí.
Usar Resend. Diseño consistente con la identidad de Centrevit.

```ts
import { Resend } from 'resend'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Centrevit <noreply@centrevit.es>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!

// ─── PLANTILLA BASE ─────────────────────────────────────────────────────────
function emailBase(content: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F3EA;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="100%" style="max-width:560px;background:#FDFAF6;border-radius:8px;overflow:hidden;border:1px solid #EDE5D4;">
          <!-- Header -->
          <tr>
            <td style="background:#1C3A1E;padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:300;color:#FDFAF6;letter-spacing:0.08em;font-family:Georgia,serif;">
                CENTREVIT
              </p>
              <p style="margin:4px 0 0;font-size:11px;color:#C9A84C;letter-spacing:0.12em;text-transform:uppercase;">
                Centro de Bienestar · Tudela
              </p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#EDE5D4;padding:20px 32px;text-align:center;border-top:1px solid #EDE5D4;">
              <p style="margin:0;font-size:11px;color:#5A7060;">
                C. José Ramón Castro Álava, 41, 2ºA · 31500 Tudela · 679 41 71 38
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#5A7060;">
                <a href="https://centrevit.es" style="color:#33763D;">centrevit.es</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── 1. CONFIRMACIÓN DE RESERVA AL CLIENTE ──────────────────────────────────
export async function sendBookingConfirmationToClient(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Solicitud recibida
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, hemos recibido tu solicitud correctamente.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:0 0 24px;border-left:3px solid #C9A84C;">
      <p style="margin:0 0 8px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Tratamiento</p>
      <p style="margin:0 0 16px;font-size:16px;color:#1C2B1D;font-weight:500;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Fecha solicitada</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <p style="margin:0 0 24px;font-size:14px;color:#5A7060;line-height:1.6;">
      Nos pondremos en contacto contigo en las próximas horas para confirmar tu cita.
      Si necesitas contactarnos antes, puedes llamarnos al <strong style="color:#1C2B1D;">679 41 71 38</strong>.
    </p>
    <p style="margin:0;font-size:13px;color:#5A7060;">Un saludo,<br><strong style="color:#1C2B1D;">El equipo de Centrevit</strong></p>
  `

  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Solicitud recibida — ${params.serviceName} | Centrevit`,
    html: emailBase(content),
  })
}

// ─── 2. ALERTA AL ADMIN DE NUEVA RESERVA ────────────────────────────────────
export async function sendNewBookingAlertToAdmin(params: {
  clientName: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Nueva solicitud de reserva
    </h1>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:16px 0;border-left:3px solid #33763D;">
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Cliente</p>
      <p style="margin:0 0 12px;font-size:15px;color:#1C2B1D;font-weight:500;">${params.clientName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Servicio</p>
      <p style="margin:0 0 12px;font-size:15px;color:#1C2B1D;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Fecha solicitada</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/reservas"
       style="display:inline-block;background:#33763D;color:#FDFAF6;padding:12px 24px;border-radius:4px;text-decoration:none;font-size:14px;font-weight:500;">
      Ver en el panel
    </a>
  `

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Nueva reserva — ${params.clientName} · ${params.serviceName}`,
    html: emailBase(content),
  })
}

// ─── 3. CONFIRMACIÓN OFICIAL DE CITA ────────────────────────────────────────
export async function sendBookingConfirmedToClient(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Cita confirmada
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, tu cita está confirmada.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:0 0 24px;border-left:3px solid #33763D;">
      <p style="margin:0 0 8px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Tratamiento</p>
      <p style="margin:0 0 16px;font-size:16px;color:#1C2B1D;font-weight:500;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;text-transform:uppercase;letter-spacing:0.08em;">Fecha y hora</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <p style="margin:0 0 8px;font-size:13px;color:#5A7060;">
      <strong style="color:#1C2B1D;">Dirección:</strong> C. José Ramón Castro Álava, 41, 2ºA, Tudela
    </p>
    <p style="margin:0 0 24px;font-size:13px;color:#5A7060;">
      Si necesitas cancelar o cambiar la cita, contáctanos con al menos 24h de antelación.
    </p>
    <p style="margin:0;font-size:13px;color:#5A7060;">Hasta pronto,<br><strong style="color:#1C2B1D;">Centrevit</strong></p>
  `

  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Cita confirmada — ${params.serviceName} · ${timeStr}h | Centrevit`,
    html: emailBase(content),
  })
}

// ─── 4. RECORDATORIO 24H ANTES ──────────────────────────────────────────────
export async function sendReminder24h(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const dateStr = format(params.startsAt, "EEEE, d 'de' MMMM", { locale: es })
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Tu cita es mañana
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, te recordamos que mañana tienes una sesión en Centrevit.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:20px;margin:0 0 24px;border-left:3px solid #C9A84C;">
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Tratamiento</p>
      <p style="margin:0 0 12px;font-size:15px;color:#1C2B1D;font-weight:500;">${params.serviceName}</p>
      <p style="margin:0 0 4px;font-size:12px;color:#5A7060;">Cuándo</p>
      <p style="margin:0;font-size:15px;color:#1C2B1D;">${dateStr} a las ${timeStr}h</p>
    </div>
    <p style="margin:0;font-size:13px;color:#5A7060;">
      Si necesitas cancelar, llámanos al <strong style="color:#1C2B1D;">679 41 71 38</strong> con antelación.
    </p>
  `

  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Recordatorio — Tu cita de ${params.serviceName} es mañana | Centrevit`,
    html: emailBase(content),
  })
}

// ─── 5. RECORDATORIO 2H ANTES ───────────────────────────────────────────────
export async function sendReminder2h(params: {
  clientName: string
  clientEmail: string
  serviceName: string
  startsAt: Date
}) {
  const timeStr = format(params.startsAt, 'HH:mm')

  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:300;color:#1C2B1D;font-family:Georgia,serif;">
      Tu cita en 2 horas
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:#5A7060;">
      Hola ${params.clientName}, en menos de 2 horas tienes tu sesión de ${params.serviceName}.
    </p>
    <div style="background:#F7F3EA;border-radius:6px;padding:16px 20px;margin:0 0 24px;border-left:3px solid #C9A84C;">
      <p style="margin:0;font-size:16px;color:#1C2B1D;font-weight:500;">Hoy a las ${timeStr}h</p>
      <p style="margin:4px 0 0;font-size:13px;color:#5A7060;">C. José Ramón Castro Álava, 41, 2ºA · Tudela</p>
    </div>
    <p style="margin:0;font-size:13px;color:#5A7060;">Hasta luego,<br><strong style="color:#1C2B1D;">Centrevit</strong></p>
  `

  return resend.emails.send({
    from: FROM,
    to: params.clientEmail,
    subject: `Tu cita de ${params.serviceName} es en 2 horas | Centrevit`,
    html: emailBase(content),
  })
}
```

---

## TAREA 4 — API ROUTE: ENVIAR RECORDATORIOS (cron job)

### src/app/api/cron/recordatorios/route.ts

Este endpoint lo llama Vercel Cron cada hora. Busca reservas confirmadas
cuya `starts_at` esté a 24h o a 2h y envía el recordatorio correspondiente.
Solo accesible con el header `Authorization: Bearer CRON_SECRET`.

```ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendReminder24h, sendReminder2h } from '@/lib/emails'
import { addHours, isWithinInterval, startOfHour, endOfHour } from 'date-fns'

export async function GET(req: NextRequest) {
  // Verificar autorización del cron
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date()

  // Ventana de 24h: reservas entre ahora+23h y ahora+25h
  const window24hStart = addHours(now, 23)
  const window24hEnd   = addHours(now, 25)

  // Ventana de 2h: reservas entre ahora+1h y ahora+3h
  const window2hStart = addHours(now, 1)
  const window2hEnd   = addHours(now, 3)

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, starts_at, clients(name, email), services(name)')
    .eq('status', 'confirmed')
    .or(`starts_at.gte.${window24hStart.toISOString()},starts_at.lte.${window24hEnd.toISOString()}`)

  if (!bookings?.length) {
    return NextResponse.json({ sent: 0 })
  }

  let sent = 0
  for (const booking of bookings) {
    const startsAt = new Date(booking.starts_at)
    const client = booking.clients as any
    const service = booking.services as any

    const is24h = isWithinInterval(startsAt, { start: window24hStart, end: window24hEnd })
    const is2h  = isWithinInterval(startsAt, { start: window2hStart,  end: window2hEnd  })

    if (is24h) {
      await sendReminder24h({ clientName: client.name, clientEmail: client.email, serviceName: service.name, startsAt })
      sent++
    } else if (is2h) {
      await sendReminder2h({ clientName: client.name, clientEmail: client.email, serviceName: service.name, startsAt })
      sent++
    }
  }

  return NextResponse.json({ sent })
}
```

Añadir a `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/recordatorios",
      "schedule": "0 * * * *"
    }
  ]
}
```

Añadir a `.env.local`:
```
CRON_SECRET=<genera un string aleatorio seguro>
```

---

## TAREA 5 — SERVER ACTIONS: RESERVAS

### src/app/(dashboard)/admin/reservas/actions.ts

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { updateBookingSchema } from '@/lib/validations/schemas'
import { sendBookingConfirmedToClient } from '@/lib/emails'

// Verificar que el usuario está autenticado en todas las actions
async function requireAuth() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return user
}

export async function confirmarReserva(bookingId: string) {
  await requireAuth()

  const supabase = createAdminClient()

  // Cargar la reserva con datos del cliente y servicio
  const { data: booking } = await supabase
    .from('bookings')
    .select('id, starts_at, status, clients(name, email), services(name)')
    .eq('id', bookingId)
    .single()

  if (!booking || booking.status !== 'pending') {
    throw new Error('Reserva no encontrada o ya procesada.')
  }

  // Actualizar estado
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', bookingId)

  if (error) throw new Error('Error al confirmar la reserva.')

  // Enviar email de confirmación al cliente
  const client = booking.clients as any
  const service = booking.services as any

  await sendBookingConfirmedToClient({
    clientName:   client.name,
    clientEmail:  client.email,
    serviceName:  service.name,
    startsAt:     new Date(booking.starts_at),
  })

  revalidatePath('/admin/reservas')
  revalidatePath('/admin')
  revalidatePath('/admin/calendario')
}

export async function cancelarReserva(bookingId: string) {
  await requireAuth()

  const supabase = createAdminClient()

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)

  if (error) throw new Error('Error al cancelar la reserva.')

  revalidatePath('/admin/reservas')
  revalidatePath('/admin')
  revalidatePath('/admin/calendario')
}

export async function marcarRealizada(bookingId: string) {
  await requireAuth()
  const supabase = createAdminClient()

  // Cargar el servicio para calcular la fecha de seguimiento
  const { data: booking } = await supabase
    .from('bookings')
    .select('id, starts_at, services(followup_days)')
    .eq('id', bookingId)
    .single()

  if (!booking) throw new Error('Reserva no encontrada.')

  const service = booking.services as any
  const followupDate = service?.followup_days
    ? new Date(new Date(booking.starts_at).getTime() + service.followup_days * 24 * 60 * 60 * 1000)
    : null

  const { error } = await supabase
    .from('bookings')
    .update({
      status:        'done',
      followup_done: false,
      followup_date: followupDate?.toISOString() ?? null,
    })
    .eq('id', bookingId)

  if (error) throw new Error('Error al marcar la reserva.')

  revalidatePath('/admin/reservas')
  revalidatePath('/admin')
}

export async function marcarSeguimientoRealizado(bookingId: string) {
  await requireAuth()
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('bookings')
    .update({ followup_done: true })
    .eq('id', bookingId)

  if (error) throw new Error('Error al marcar el seguimiento.')

  revalidatePath('/admin')
  revalidatePath('/admin/clientes')
}

export async function actualizarNotasInternas(bookingId: string, notes: string) {
  await requireAuth()

  // Sanitizar input — truncar a máximo permitido
  const sanitized = notes.trim().slice(0, 1000)

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('bookings')
    .update({ internal_notes: sanitized })
    .eq('id', bookingId)

  if (error) throw new Error('Error al guardar las notas.')

  revalidatePath('/admin/reservas')
}
```

---

## TAREA 6 — SERVER ACTIONS: CLIENTES

### src/app/(dashboard)/admin/clientes/actions.ts

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClientSchema } from '@/lib/validations/schemas'

async function requireAuth() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return user
}

export async function actualizarFichaTecnica(
  clientId: string,
  data: { allergies?: string; medical_notes?: string; general_notes?: string }
) {
  await requireAuth()

  // Sanitizar y truncar todos los campos de texto libre
  const sanitized = {
    allergies:     data.allergies?.trim().slice(0, 1000) ?? null,
    medical_notes: data.medical_notes?.trim().slice(0, 2000) ?? null,
    general_notes: data.general_notes?.trim().slice(0, 2000) ?? null,
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('clients')
    .update(sanitized)
    .eq('id', clientId)

  if (error) throw new Error('Error al actualizar la ficha.')

  revalidatePath(`/admin/clientes/${clientId}`)
}

export async function crearCliente(formData: FormData) {
  await requireAuth()

  const raw = {
    name:          formData.get('name'),
    email:         formData.get('email'),
    phone:         formData.get('phone') || undefined,
    birth_date:    formData.get('birth_date') || undefined,
    allergies:     formData.get('allergies') || undefined,
    medical_notes: formData.get('medical_notes') || undefined,
    general_notes: formData.get('general_notes') || undefined,
    source:        formData.get('source') || undefined,
  }

  const parsed = createClientSchema.safeParse(raw)
  if (!parsed.success) throw new Error('Datos del cliente inválidos.')

  const supabase = createAdminClient()

  // Obtener tenant_id de Centrevit
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('slug', 'centrevit')
    .single()

  if (!tenant) throw new Error('Error de configuración.')

  const { data: client, error } = await supabase
    .from('clients')
    .insert({ ...parsed.data, tenant_id: tenant.id })
    .select('id')
    .single()

  if (error) throw new Error('Error al crear el cliente.')

  revalidatePath('/admin/clientes')
  redirect(`/admin/clientes/${client.id}`)
}
```

---

## TAREA 7 — SERVER ACTIONS: CAJA

### src/app/(dashboard)/admin/caja/actions.ts

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createPaymentSchema } from '@/lib/validations/schemas'

async function requireAuth() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return user
}

export async function registrarPago(formData: FormData) {
  await requireAuth()

  const raw = {
    booking_id: formData.get('booking_id') || undefined,
    client_id:  formData.get('client_id')  || undefined,
    amount:     Number(formData.get('amount')),
    method:     formData.get('method'),
    notes:      formData.get('notes') || undefined,
    paid_at:    formData.get('paid_at')    || undefined,
  }

  const parsed = createPaymentSchema.safeParse(raw)
  if (!parsed.success) throw new Error('Datos del pago inválidos.')

  const supabase = createAdminClient()

  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('slug', 'centrevit')
    .single()

  if (!tenant) throw new Error('Error de configuración.')

  const { error: paymentError } = await supabase
    .from('payments')
    .insert({ ...parsed.data, tenant_id: tenant.id })

  if (paymentError) throw new Error('Error al registrar el pago.')

  // Si hay reserva asociada, actualizar su estado de pago
  if (parsed.data.booking_id) {
    await supabase
      .from('bookings')
      .update({ payment_status: 'paid', price_charged: parsed.data.amount })
      .eq('id', parsed.data.booking_id)
  }

  revalidatePath('/admin/caja')
  revalidatePath('/admin/reservas')
}
```

---

## TAREA 8 — SEGURIDAD: CONTENT SECURITY POLICY

### next.config.ts (añadir a los headers existentes)

```ts
// Añadir dentro del array de headers existente:
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",   // unsafe-eval necesario para Next.js dev
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://picsum.photos",
    "connect-src 'self' https://*.supabase.co",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; ')
}
```

---

## TAREA 9 — CHECKLIST DE SEGURIDAD (verificar antes de entregar)

Revisar y confirmar que cada punto está activo:

**Autenticación y autorización:**
- [ ] Middleware protege todas las rutas `/admin/*` — redirige a `/auth/login` si no hay sesión
- [ ] Todas las Server Actions llaman a `requireAuth()` antes de cualquier operación
- [ ] `SUPABASE_SERVICE_ROLE_KEY` solo se usa en `src/lib/supabase/admin.ts` — nunca en client
- [ ] RLS activo en todas las tablas de Supabase

**Validación de inputs:**
- [ ] Todos los inputs de formularios validados con Zod antes de tocar la DB
- [ ] Todos los campos de texto libre truncados a longitud máxima antes de insertar
- [ ] IDs de URL validados como UUID antes de hacer queries
- [ ] El endpoint público `/api/reservas` valida con Zod antes de cualquier operación

**Rate limiting y protección:**
- [ ] Rate limiting activo en `/api/reservas` (5 peticiones/IP/10min)
- [ ] Cron endpoint `/api/cron/recordatorios` protegido con `CRON_SECRET`
- [ ] Headers de seguridad HTTP activos (X-Frame-Options, CSP, etc.)
- [ ] `robots.txt` bloquea `/admin/` y `/auth/`

**Variables de entorno:**
- [ ] `.env.local` en `.gitignore`
- [ ] Ninguna variable secreta con prefijo `NEXT_PUBLIC_`
- [ ] Todas las variables necesarias documentadas en `.env.example`

---

## TAREA 10 — .env.example

### .env.example (commitear este, nunca el .env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=
CRON_SECRET=
```

---

## ENTREGA

Cuando termines, confirmar:
1. `npm run build` sin errores TypeScript
2. Todos los endpoints probados manualmente:
   - `POST /api/reservas` con datos válidos → 201
   - `POST /api/reservas` con datos inválidos → 422
   - `POST /api/reservas` sin rate limit → 429
   - `GET /admin` sin autenticación → redirect a `/auth/login`
3. Checklist de seguridad completo al 100%
4. Lista de lo que necesita configuración manual (Supabase, Resend, Vercel Cron)
