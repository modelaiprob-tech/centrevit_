'use client'

import { useState } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { CalendarioSemanal } from '@/components/dashboard/calendario/CalendarioSemanal'
import { CalendarioDia } from '@/components/dashboard/calendario/CalendarioDia'

export default function CalendarioPage() {
  const [vista, setVista] = useState<'semana' | 'dia'>('semana')
  const [fechaActual, setFechaActual] = useState(new Date())

  // mock data for shell
  const bookings: any[] = []

  return (
    <DashboardShell>
      <PageHeader 
        title="Calendario" 
        action={
          <div className="flex bg-crema p-1 rounded-lg border border-crema-oscuro font-sans text-sm">
            <button 
              onClick={() => setVista('semana')}
              className={`px-4 py-1.5 rounded-md transition-colors ${vista === 'semana' ? 'bg-blanco text-texto shadow-sm' : 'text-texto-muted hover:text-texto'}`}
            >
              Semana
            </button>
            <button 
              onClick={() => setVista('dia')}
              className={`px-4 py-1.5 rounded-md transition-colors ${vista === 'dia' ? 'bg-blanco text-texto shadow-sm' : 'text-texto-muted hover:text-texto'}`}
            >
              Día
            </button>
          </div>
        }
      />

      <div className="bg-blanco border border-crema-oscuro rounded-lg p-4 custom-scrollbar">
        {vista === 'semana' ? (
          <CalendarioSemanal 
            bookings={bookings} 
            weekStart={fechaActual} 
            onChangeWeek={(date: Date) => setFechaActual(date)} 
          />
        ) : (
          <CalendarioDia 
            bookings={bookings} 
            date={fechaActual} 
            onChangeDate={(date: Date) => setFechaActual(date)} 
          />
        )}
      </div>
    </DashboardShell>
  )
}
