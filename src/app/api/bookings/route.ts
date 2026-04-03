import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import pool from '@/lib/db'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = req.nextUrl
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (!from || !to) {
    return NextResponse.json({ error: 'Faltan parámetros from/to' }, { status: 400 })
  }

  const { rows } = await pool.query(`
    SELECT b.id, b.starts_at, b.ends_at, b.status,
      json_build_object('name', c.name) AS clients,
      json_build_object('name', s.name) AS services
    FROM bookings b
    JOIN clients c ON b.client_id = c.id
    JOIN services s ON b.service_id = s.id
    WHERE b.starts_at >= $1
      AND b.starts_at <= $2
      AND b.status != 'cancelled'
    ORDER BY b.starts_at
  `, [from, to])

  return NextResponse.json(rows)
}
