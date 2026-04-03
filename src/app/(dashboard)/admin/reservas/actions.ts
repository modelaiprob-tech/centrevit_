'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import pool from '@/lib/db'
import { sendBookingConfirmedToClient } from '@/lib/emails'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return user
}

export async function confirmarReserva(bookingId: string) {
  await requireAuth()

  const { rows: [booking] } = await pool.query(`
    SELECT b.id, b.starts_at, b.status,
      json_build_object('name', c.name, 'email', c.email) AS clients,
      json_build_object('name', s.name) AS services
    FROM bookings b
    JOIN clients c ON b.client_id = c.id
    JOIN services s ON b.service_id = s.id
    WHERE b.id = $1
  `, [bookingId])

  if (!booking || booking.status !== 'pending') {
    throw new Error('Reserva no encontrada o ya procesada.')
  }

  await pool.query(`UPDATE bookings SET status = 'confirmed' WHERE id = $1`, [bookingId])

  if (booking.clients && booking.services) {
    await sendBookingConfirmedToClient({
      clientName:  booking.clients.name,
      clientEmail: booking.clients.email,
      serviceName: booking.services.name,
      startsAt:    new Date(booking.starts_at),
    })
  }

  revalidatePath('/admin/reservas')
  revalidatePath(`/admin/reservas/${bookingId}`)
  revalidatePath('/admin')
  revalidatePath('/admin/calendario')
}

export async function cancelarReserva(bookingId: string) {
  await requireAuth()
  await pool.query(`UPDATE bookings SET status = 'cancelled' WHERE id = $1`, [bookingId])
  revalidatePath('/admin/reservas')
  revalidatePath(`/admin/reservas/${bookingId}`)
  revalidatePath('/admin')
  revalidatePath('/admin/calendario')
}

export async function marcarRealizada(bookingId: string) {
  await requireAuth()

  const { rows: [booking] } = await pool.query(`
    SELECT b.starts_at, s.followup_days
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.id = $1
  `, [bookingId])

  if (!booking) throw new Error('Reserva no encontrada.')

  const followupDate = booking.followup_days
    ? new Date(new Date(booking.starts_at).getTime() + booking.followup_days * 24 * 60 * 60 * 1000)
    : null

  await pool.query(`
    UPDATE bookings
    SET status = 'done', followup_done = false, followup_date = $1
    WHERE id = $2
  `, [followupDate?.toISOString() ?? null, bookingId])

  revalidatePath('/admin/reservas')
  revalidatePath(`/admin/reservas/${bookingId}`)
  revalidatePath('/admin')
}

export async function reprogramarReserva(bookingId: string, formData: FormData) {
  await requireAuth()

  const startsAtRaw = formData.get('starts_at') as string
  if (!startsAtRaw) throw new Error('Fecha requerida')

  const starts_at = new Date(startsAtRaw)

  const { rows: [booking] } = await pool.query(`
    SELECT b.tenant_id, s.duration
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.id = $1
  `, [bookingId])

  if (!booking) throw new Error('Reserva no encontrada')

  const ends_at = new Date(starts_at.getTime() + booking.duration * 60 * 1000)

  const { rows: [conflict] } = await pool.query(`
    SELECT id FROM bookings
    WHERE tenant_id = $1
      AND id != $2
      AND status != 'cancelled'
      AND starts_at < $3
      AND ends_at > $4
    LIMIT 1
  `, [booking.tenant_id, bookingId, ends_at.toISOString(), starts_at.toISOString()])

  if (conflict) throw new Error('Ese horario ya está ocupado.')

  await pool.query(
    `UPDATE bookings SET starts_at = $1, ends_at = $2 WHERE id = $3`,
    [starts_at.toISOString(), ends_at.toISOString(), bookingId]
  )

  revalidatePath('/admin/reservas')
  revalidatePath(`/admin/reservas/${bookingId}`)
  revalidatePath('/admin/calendario')
}

export async function marcarSeguimientoRealizado(bookingId: string) {
  await requireAuth()
  await pool.query(`UPDATE bookings SET followup_done = true WHERE id = $1`, [bookingId])
  revalidatePath('/admin')
  revalidatePath('/admin/reservas')
  revalidatePath('/admin/clientes')
  revalidatePath('/admin/estadisticas')
}

export async function actualizarNotasInternas(bookingId: string, notes: string) {
  await requireAuth()
  const sanitized = notes.trim().slice(0, 1000)
  await pool.query(`UPDATE bookings SET internal_notes = $1 WHERE id = $2`, [sanitized, bookingId])
  revalidatePath('/admin/reservas')
  revalidatePath(`/admin/reservas/${bookingId}`)
}
