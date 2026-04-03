'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import pool from '@/lib/db'
import { createClientSchema } from '@/lib/validations/schemas'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return user
}

export async function actualizarFichaTecnica(
  clientId: string,
  data: { allergies?: string; medical_notes?: string; general_notes?: string }
) {
  await requireAuth()

  const sanitized = {
    allergies:     data.allergies?.trim().slice(0, 1000) ?? null,
    medical_notes: data.medical_notes?.trim().slice(0, 2000) ?? null,
    general_notes: data.general_notes?.trim().slice(0, 2000) ?? null,
  }

  await pool.query(`
    UPDATE clients
    SET allergies = $1, medical_notes = $2, general_notes = $3, updated_at = NOW()
    WHERE id = $4
  `, [sanitized.allergies, sanitized.medical_notes, sanitized.general_notes, clientId])

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

  const { rows: [tenant] } = await pool.query(
    `SELECT id FROM tenants WHERE slug = 'centrevit'`
  )
  if (!tenant) throw new Error('Error de configuración.')

  const { rows: [client] } = await pool.query(`
    INSERT INTO clients (tenant_id, name, email, phone, birth_date, allergies, medical_notes, general_notes, source)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (tenant_id, email) DO UPDATE
      SET name = EXCLUDED.name, phone = EXCLUDED.phone
    RETURNING id
  `, [
    tenant.id,
    parsed.data.name,
    parsed.data.email,
    parsed.data.phone ?? null,
    parsed.data.birth_date ?? null,
    parsed.data.allergies ?? null,
    parsed.data.medical_notes ?? null,
    parsed.data.general_notes ?? null,
    parsed.data.source ?? null,
  ])

  if (!client) throw new Error('Error al crear el cliente.')

  revalidatePath('/admin/clientes')
  redirect(`/admin/clientes/${client.id}`)
}
