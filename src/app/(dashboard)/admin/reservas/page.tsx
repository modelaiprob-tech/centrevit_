import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatusBadge } from '@/components/dashboard/ui/StatusBadge'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ReservasPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = await createClient()
  const statusParam = searchParams?.status as string
  const fechaParam = searchParams?.fecha as string
  // page ignoring for shell

  let query = supabase.from('bookings').select('*, clients(*), services(*)').order('starts_at', { ascending: false })
  
  if (statusParam && statusParam !== 'todas') {
    query = query.eq('status', statusParam)
  }
  if (fechaParam) {
    query = query.gte('starts_at', fechaParam).lte('starts_at', fechaParam + 'T23:59:59')
  }

  const { data: reservas } = await query.limit(20)

  return (
    <DashboardShell>
      <PageHeader 
        title="Reservas" 
        action={
          <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
            Nueva reserva
          </button>
        } 
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-1 flex font-sans text-sm inline-flex">
          {['todas', 'pending', 'confirmed', 'done', 'cancelled'].map(t => (
            <Link 
              key={t}
              href={`?status=${t}${fechaParam ? `&fecha=${fechaParam}` : ''}`}
              className={`px-4 py-1.5 rounded-md capitalize ${(!statusParam && t === 'todas') || statusParam === t ? 'bg-verde/10 text-verde font-medium' : 'text-texto-muted hover:text-texto'}`}
            >
              {t === 'pending' ? 'Pendientes' : t === 'confirmed' ? 'Confirmadas' : t === 'done' ? 'Realizadas' : t === 'cancelled' ? 'Canceladas' : 'Todas'}
            </Link>
          ))}
        </div>
        <input 
          type="date" 
          defaultValue={fechaParam || ''}
          className="px-3 py-1.5 bg-blanco border border-crema-oscuro rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
          // Add simple client side redirect on change for the shell later
        />
      </div>

      <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left font-sans">
          <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha/Hora</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Servicio</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Pago</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-texto-muted">No se encontraron reservas</td>
              </tr>
            ) : (
              reservas?.map((reserva: any) => (
                <tr key={reserva.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                  <td className="px-4 py-3">
                    {new Date(reserva.starts_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">{reserva.clients?.name}</td>
                  <td className="px-4 py-3">{reserva.services?.name}</td>
                  <td className="px-4 py-3"><StatusBadge status={reserva.status as any} /></td>
                  <td className="px-4 py-3 text-texto-muted capitalize">{reserva.payment_status}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {reserva.status === 'pending' && <button className="text-verde hover:text-verde-medio underline">Confirmar</button>}
                    {reserva.status === 'confirmed' && <button className="text-texto-muted hover:text-texto underline">Marcar realizada</button>}
                    <Link href={`/admin/reservas/${reserva.id}`} className="text-texto-muted hover:text-texto underline">Ver</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm font-sans text-texto-muted">
        <span>Mostrando hasta 20 reservas</span>
        <div className="space-x-2 flex">
          <button className="px-3 py-1 bg-blanco border border-crema-oscuro rounded hover:bg-crema cursor-not-allowed opacity-50">Anterior</button>
          <button className="px-3 py-1 bg-blanco border border-crema-oscuro rounded hover:bg-crema cursor-not-allowed opacity-50">Siguiente</button>
        </div>
      </div>
    </DashboardShell>
  )
}
