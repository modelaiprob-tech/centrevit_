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

async function getTenantId() {
  const { rows: [tenant] } = await pool.query(
    `SELECT id FROM tenants WHERE slug = 'centrevit'`
  )
  if (!tenant) throw new Error('Tenant no encontrado.')
  return tenant.id as string
}

export async function guardarDatosCentro(formData: FormData) {
  await requireAuth()
  const tenantId = await getTenantId()

  const name    = (formData.get('name')    as string)?.trim()
  const phone   = (formData.get('phone')   as string)?.trim() || null
  const email   = (formData.get('email')   as string)?.trim() || null
  const address = (formData.get('address') as string)?.trim() || null

  if (!name || name.length < 2) throw new Error('Nombre requerido.')

  await pool.query(
    `UPDATE tenants SET name = $1, phone = $2, email = $3, address = $4 WHERE id = $5`,
    [name, phone, email, address, tenantId]
  )

  revalidatePath('/admin/settings')
}

export async function guardarHorarios(formData: FormData) {
  await requireAuth()
  const tenantId = await getTenantId()

  // En la DB: day_of_week 0=Lunes, 1=Martes, ..., 6=Domingo
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
  const dayMap: Record<string, number> = {
    lunes: 0, martes: 1, miercoles: 2, jueves: 3, viernes: 4, sabado: 5, domingo: 6,
  }

  for (const dia of dias) {
    const activo = formData.get(`${dia}_activo`) === 'on'
    const inicio = (formData.get(`${dia}_inicio`) as string) || '09:00'
    const fin    = (formData.get(`${dia}_fin`)    as string) || '18:00'
    const dow    = dayMap[dia]

    // Usa la tabla schedules (tabla real del schema) con ON CONFLICT
    await pool.query(`
      INSERT INTO schedules (tenant_id, day_of_week, start_time, end_time, active)
      VALUES ($1, $2, $3::time, $4::time, $5)
      ON CONFLICT (tenant_id, day_of_week)
      DO UPDATE SET start_time = $3::time, end_time = $4::time, active = $5
    `, [tenantId, dow, inicio, fin, activo])
  }

  revalidatePath('/admin/settings')
}

export async function guardarPreferencias(formData: FormData) {
  await requireAuth()
  const tenantId = await getTenantId()

  const settings = {
    notif_nueva_reserva:   formData.get('notif-nueva-reserva')   === 'on',
    notif_recordatorio_24: formData.get('notif-recordatorio-24') === 'on',
    notif_recordatorio_2:  formData.get('notif-recordatorio-2')  === 'on',
    notif_seguimiento:     formData.get('notif-seguimiento')     === 'on',
  }

  await pool.query(
    `UPDATE tenants SET settings = $1 WHERE id = $2`,
    [JSON.stringify(settings), tenantId]
  )

  revalidatePath('/admin/settings')
}
