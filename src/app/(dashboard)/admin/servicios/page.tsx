import { Suspense } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { TableSkeleton } from '@/components/dashboard/ui/Skeletons'
import { ServicioModal } from '@/components/dashboard/servicios/ServicioModal'
import pool from '@/lib/db'
import { toggleServicioActivo } from './actions'

export const dynamic = 'force-dynamic'

async function TablaServicios() {
  const { rows: servicios } = await pool.query(`SELECT * FROM services ORDER BY name`)

  return (
    <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left font-sans">
        <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Duración</th>
            <th className="px-4 py-3 font-medium">Precio</th>
            <th className="px-4 py-3 font-medium">Seguimiento</th>
            <th className="px-4 py-3 font-medium text-center">Activo</th>
            <th className="px-4 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!servicios.length ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-texto-muted">No hay servicios configurados</td>
            </tr>
          ) : (
            servicios.map((servicio: any) => (
              <tr key={servicio.id} className={`border-b border-crema-oscuro last:border-0 hover:bg-crema/20 ${!servicio.active ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3 font-medium text-texto">{servicio.name}</td>
                <td className="px-4 py-3 text-texto-muted">{servicio.duration} min</td>
                <td className="px-4 py-3">{servicio.price ? `${Number(servicio.price).toFixed(2)}€` : '-'}</td>
                <td className="px-4 py-3 text-texto-muted">{servicio.followup_days ? `${servicio.followup_days} días` : '-'}</td>
                <td className="px-4 py-3 text-center">
                  <form action={toggleServicioActivo.bind(null, servicio.id, servicio.active)}>
                    <button
                      type="submit"
                      title={servicio.active ? 'Desactivar' : 'Activar'}
                      className={`w-10 h-5 rounded-full transition-colors focus:outline-none ${servicio.active ? 'bg-verde' : 'bg-crema-oscuro'}`}
                    >
                      <span className={`block w-4 h-4 rounded-full bg-blanco shadow transition-transform mx-0.5 ${servicio.active ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <ServicioModal
                    servicio={servicio}
                    trigger={<button className="text-texto-muted hover:text-texto underline text-sm">Editar</button>}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function ServiciosPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Servicios"
        action={
          <ServicioModal
            trigger={
              <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
                Nuevo servicio
              </button>
            }
          />
        }
      />
      <Suspense fallback={<TableSkeleton cols={6} rows={5} />}>
        <TablaServicios />
      </Suspense>
    </DashboardShell>
  )
}
