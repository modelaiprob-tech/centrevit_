import { cache } from 'react'
import pool from '@/lib/db'

/**
 * React cache() deduplicates calls within a single render pass.
 * Useful when multiple components in the same tree need the same data.
 */

export const getTenantId = cache(async (): Promise<string> => {
  const { rows: [tenant] } = await pool.query(
    `SELECT id FROM tenants WHERE slug = 'centrevit'`
  )
  return tenant?.id ?? null
})

export const getServiciosActivos = cache(async () => {
  const { rows } = await pool.query(
    `SELECT id, name, duration, price FROM services WHERE active = true ORDER BY name`
  )
  return rows
})

export const getClientesActivos = cache(async () => {
  const { rows } = await pool.query(
    `SELECT id, name, email FROM clients WHERE active = true ORDER BY name`
  )
  return rows
})
