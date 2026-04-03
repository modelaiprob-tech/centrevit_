'use client'

import { useState } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'

// Client component as specified
export default function ServiciosPage() {
  const [servicios, setServicios] = useState<any[]>([])

  return (
    <DashboardShell>
      <PageHeader 
        title="Servicios" 
        action={
          <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
            Nuevo servicio
          </button>
        } 
      />

      <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left font-sans">
          <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Duración</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Seguimiento</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-texto-muted">
                (Shell) Los servicios se cargarán aquí.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal shell here */}
    </DashboardShell>
  )
}
