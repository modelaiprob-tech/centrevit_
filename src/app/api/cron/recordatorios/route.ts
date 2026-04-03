import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { sendReminder24h, sendReminder2h } from '@/lib/emails'
import { addHours, isWithinInterval } from 'date-fns'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const window24hStart = addHours(now, 23)
  const window24hEnd   = addHours(now, 25)
  const window2hStart  = addHours(now, 1)
  const window2hEnd    = addHours(now, 3)

  const { rows: bookings } = await pool.query(`
    SELECT b.id, b.starts_at,
      json_build_object('name', c.name, 'email', c.email) AS clients,
      json_build_object('name', s.name) AS services
    FROM bookings b
    JOIN clients c ON b.client_id = c.id
    JOIN services s ON b.service_id = s.id
    WHERE b.status = 'confirmed'
      AND b.starts_at >= $1
      AND b.starts_at <= $2
  `, [window2hStart.toISOString(), window24hEnd.toISOString()])

  if (!bookings.length) return NextResponse.json({ sent: 0 })

  const tasks = bookings
    .filter(b => b.clients?.email)
    .map(booking => {
      const startsAt = new Date(booking.starts_at)
      const { name: clientName, email: clientEmail } = booking.clients
      const { name: serviceName } = booking.services

      const is24h = isWithinInterval(startsAt, { start: window24hStart, end: window24hEnd })
      const is2h  = isWithinInterval(startsAt, { start: window2hStart,  end: window2hEnd  })

      if (is24h) return sendReminder24h({ clientName, clientEmail, serviceName, startsAt })
      if (is2h)  return sendReminder2h({ clientName, clientEmail, serviceName, startsAt })
      return null
    })
    .filter(Boolean) as Promise<unknown>[]

  const results = await Promise.allSettled(tasks)
  const sent = results.filter(r => r.status === 'fulfilled').length
  const failed = results.filter(r => r.status === 'rejected').length

  return NextResponse.json({ sent, failed })
}
