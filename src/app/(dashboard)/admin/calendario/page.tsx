'use client'

import { useState, useEffect, useCallback } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { CalendarioSemanal } from '@/components/dashboard/calendario/CalendarioSemanal'
import { CalendarioDia } from '@/components/dashboard/calendario/CalendarioDia'
import { CalendarioMes } from '@/components/dashboard/calendario/CalendarioMes'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns'

export default function CalendarioPage() {
  const [vista, setVista] = useState<'mes' | 'semana' | 'dia'>('semana')
  const [fechaActual, setFechaActual] = useState(new Date())
  const [bookings, setBookings] = useState<any[]>([])

  const fetchBookings = useCallback(async (v: 'mes' | 'semana' | 'dia', fecha: Date) => {
    let from: Date, to: Date

    if (v === 'semana') {
      from = startOfWeek(fecha, { weekStartsOn: 1 })
      to = endOfWeek(fecha, { weekStartsOn: 1 })
    } else if (v === 'mes') {
      from = startOfMonth(fecha)
      to = endOfMonth(fecha)
    } else {
      from = startOfDay(fecha)
      to = endOfDay(fecha)
    }

    const res = await fetch(
      `/api/bookings?from=${from.toISOString()}&to=${to.toISOString()}`
    )
    if (res.ok) setBookings(await res.json())
  }, [])

  useEffect(() => {
    fetchBookings(vista, fechaActual)
  }, [vista, fechaActual, fetchBookings])

  return (
    <DashboardShell>
      <PageHeader
        title="Calendario"
        action={
          <div className="flex bg-crema p-1 rounded-lg border border-crema-oscuro font-sans text-sm">
            {(['semana', 'dia', 'mes'] as const).map(v => (
              <button
                key={v}
                onClick={() => setVista(v)}
                className={`px-4 py-1.5 rounded-md transition-colors capitalize ${vista === v ? 'bg-blanco text-texto shadow-sm' : 'text-texto-muted hover:text-texto'}`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        }
      />

      <div className="bg-blanco border border-crema-oscuro rounded-lg p-4 custom-scrollbar">
        {vista === 'mes' ? (
          <CalendarioMes bookings={bookings} monthStart={fechaActual} onChangeMonth={setFechaActual} />
        ) : vista === 'semana' ? (
          <CalendarioSemanal bookings={bookings} weekStart={fechaActual} onChangeWeek={setFechaActual} />
        ) : (
          <CalendarioDia bookings={bookings} date={fechaActual} onChangeDate={setFechaActual} />
        )}
      </div>
    </DashboardShell>
  )
}
