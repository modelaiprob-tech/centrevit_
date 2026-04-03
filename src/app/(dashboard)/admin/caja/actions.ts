'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import pool from '@/lib/db'
import { createPaymentSchema } from '@/lib/validations/schemas'

async function requireAuth() {
  const supabase = await createClient()
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

  const { rows: [tenant] } = await pool.query(
    `SELECT id FROM tenants WHERE slug = 'centrevit'`
  )
  if (!tenant) throw new Error('Error de configuración.')

  await pool.query(`
    INSERT INTO payments (tenant_id, booking_id, client_id, amount, method, notes, paid_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `, [
    tenant.id,
    parsed.data.booking_id ?? null,
    parsed.data.client_id  ?? null,
    parsed.data.amount,
    parsed.data.method,
    parsed.data.notes ?? null,
    parsed.data.paid_at ?? new Date().toISOString(),
  ])

  if (parsed.data.booking_id) {
    await pool.query(`
      UPDATE bookings
      SET payment_status = 'paid', price_charged = $1
      WHERE id = $2
    `, [parsed.data.amount, parsed.data.booking_id])
  }

  revalidatePath('/admin/caja')
  revalidatePath('/admin/reservas')
}
