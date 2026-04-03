import { createClient } from '@/lib/supabase/server'
import { StatCard } from '@/components/dashboard/ui/StatCard'
import { StatusBadge } from '@/components/dashboard/ui/StatusBadge'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  // Simulate Parallel Queries for Shell
  const [
    { data: reservasHoy },
    { data: reservasPendientes },
    { count: totalClientes },
    { data: seguimientosPendientes }
  ] = await Promise.all([
    supabase.from('bookings').select('*, clients(*), services(*)').gte('starts_at', new Date().toISOString().split('T')[0]).lte('starts_at', new Date().toISOString().split('T')[0] + 'T23:59:59').neq('status', 'cancelled'),
    supabase.from('bookings').select('*').eq('status', 'pending'),
    supabase.from('clients').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('bookings').select('*, clients(*), services(*)').eq('followup_done', false).lte('followup_date', new Date().toISOString())
  ])

  const hoyCount = reservasHoy?.length || 0
  const pendientesCount = reservasPendientes?.length || 0
  const seguimientosCount = seguimientosPendientes?.length || 0

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          label="Citas hoy" 
          value={hoyCount} 
        />
        <StatCard 
          label="Pendientes de confirmar" 
          value={pendientesCount} 
          alert={pendientesCount > 0} 
        />
        <StatCard 
          label="Total clientes" 
          value={totalClientes || 0} 
        />
        <StatCard 
          label="Seguimientos pendientes" 
          value={seguimientosCount} 
          alert={seguimientosCount > 0} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-2xl text-texto">Citas de hoy</h2>
          <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left font-sans">
              <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Hora</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Servicio</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservasHoy?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-texto-muted">No hay citas para hoy</td>
                  </tr>
                ) : (
                  reservasHoy?.map((reserva: any) => (
                    <tr key={reserva.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                      <td className="px-4 py-3">{new Date(reserva.starts_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="px-4 py-3">{reserva.clients?.name}</td>
                      <td className="px-4 py-3">{reserva.services?.name}</td>
                      <td className="px-4 py-3"><StatusBadge status={reserva.status as any} /></td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/reservas/${reserva.id}`} className="text-verde hover:text-verde-medio underline">Ver detalle</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-texto">Seguimientos pendientes</h2>
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-4 space-y-4">
            {seguimientosPendientes?.length === 0 ? (
              <p className="text-sm font-sans text-texto-muted text-center py-4">No hay seguimientos pendientes.</p>
            ) : (
              seguimientosPendientes?.map((seg: any) => (
                <div key={seg.id} className="border-b border-crema-oscuro last:border-0 pb-4 last:pb-0">
                  <p className="font-sans text-sm font-medium text-texto">{seg.clients?.name}</p>
                  <p className="font-sans text-xs text-texto-muted">{seg.services?.name}</p>
                  <p className="font-sans text-xs text-texto-muted mb-2">Hace {seg.services?.followup_days} días</p>
                  <button className="text-xs bg-crema hover:bg-crema-oscuro text-texto px-3 py-1.5 rounded-md transition-colors w-full border border-crema-oscuro">
                    Marcar realizado
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
