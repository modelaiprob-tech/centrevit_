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

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}

export async function toggleServicioActivo(servicioId: string, activo: boolean) {
  await requireAuth()
  await pool.query(`UPDATE services SET active = $1 WHERE id = $2`, [!activo, servicioId])
  revalidatePath('/admin/servicios')
}

export async function crearServicio(formData: FormData) {
  await requireAuth()

  const name = (formData.get('name') as string)?.trim()
  const duration = parseInt(formData.get('duration') as string, 10)
  const price = formData.get('price') ? parseFloat(formData.get('price') as string) : null
  const description = (formData.get('description') as string)?.trim() || null
  const followup_days = formData.get('followup_days') ? parseInt(formData.get('followup_days') as string, 10) : null

  if (!name || name.length < 2) throw new Error('Nombre requerido')
  if (!duration || duration < 1) throw new Error('Duración requerida')

  const slug = toSlug(name)

  const { rows: [tenant] } = await pool.query(`SELECT id FROM tenants WHERE slug = 'centrevit'`)
  if (!tenant) throw new Error('Error de configuración.')

  await pool.query(`
    INSERT INTO services (tenant_id, name, slug, duration, price, description, followup_days, active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, true)
  `, [tenant.id, name, slug, duration, price, description, followup_days])

  revalidatePath('/admin/servicios')
}

export async function editarServicio(servicioId: string, formData: FormData) {
  await requireAuth()

  const name = (formData.get('name') as string)?.trim()
  const duration = parseInt(formData.get('duration') as string, 10)
  const price = formData.get('price') ? parseFloat(formData.get('price') as string) : null
  const description = (formData.get('description') as string)?.trim() || null
  const followup_days = formData.get('followup_days') ? parseInt(formData.get('followup_days') as string, 10) : null

  if (!name || name.length < 2) throw new Error('Nombre requerido')
  if (!duration || duration < 1) throw new Error('Duración requerida')

  await pool.query(`
    UPDATE services
    SET name = $1, duration = $2, price = $3, description = $4, followup_days = $5
    WHERE id = $6
  `, [name, duration, price, description, followup_days, servicioId])

  revalidatePath('/admin/servicios')
}
