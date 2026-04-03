import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { createBookingSchema } from '@/lib/validations/schemas'
import { sendBookingConfirmedToClient, sendNewBookingAlertToAdmin } from '@/lib/emails'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await rateLimit(ip)
  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Espera unos minutos.' },
      { status: 429 }
    )
  }

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

  // Verify service exists and is active
  const { rows: [service] } = await pool.query(
    `SELECT id, name, duration, tenant_id FROM services WHERE id = $1 AND active = true`,
    [service_id]
  )
  if (!service) {
    return NextResponse.json({ error: 'Servicio no disponible.' }, { status: 400 })
  }

  // Check conflict
  const start = new Date(starts_at)
  const end = new Date(start.getTime() + service.duration * 60 * 1000)

  const { rows: [conflict] } = await pool.query(`
    SELECT id FROM bookings
    WHERE tenant_id = $1
      AND status != 'cancelled'
      AND starts_at < $2
      AND ends_at > $3
    LIMIT 1
  `, [service.tenant_id, end.toISOString(), start.toISOString()])

  if (conflict) {
    return NextResponse.json(
      { error: 'Ese horario ya no está disponible. Por favor elige otro.' },
      { status: 409 }
    )
  }

  // Upsert client
  const { rows: [client] } = await pool.query(`
    INSERT INTO clients (tenant_id, name, email, phone)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (tenant_id, email) DO UPDATE
      SET name = EXCLUDED.name, phone = COALESCE(EXCLUDED.phone, clients.phone)
    RETURNING id
  `, [service.tenant_id, client_name, client_email, client_phone ?? null])

  if (!client) {
    return NextResponse.json({ error: 'Error al procesar la solicitud.' }, { status: 500 })
  }

  // Create booking
  const { rows: [booking] } = await pool.query(`
    INSERT INTO bookings (tenant_id, client_id, service_id, starts_at, ends_at, status, internal_notes)
    VALUES ($1, $2, $3, $4, $5, 'pending', $6)
    RETURNING id
  `, [service.tenant_id, client.id, service.id, start.toISOString(), end.toISOString(), notes ?? null])

  if (!booking) {
    return NextResponse.json({ error: 'Error al crear la reserva.' }, { status: 500 })
  }

  await Promise.allSettled([
    sendBookingConfirmedToClient({ clientName: client_name, clientEmail: client_email, serviceName: service.name, startsAt: start }),
    sendNewBookingAlertToAdmin({ clientName: client_name, serviceName: service.name, startsAt: start }),
  ])

  return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 })
}
