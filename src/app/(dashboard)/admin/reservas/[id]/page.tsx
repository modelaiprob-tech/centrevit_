import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatusBadge } from '@/components/dashboard/ui/StatusBadge'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ReservaDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: reserva } = await supabase.from('bookings').select('*, clients(*), services(*)').eq('id', params.id).single()

  if (!reserva) notFound()

  return (
    <DashboardShell>
      <div className="mb-4 text-sm font-sans text-texto-muted">
        <Link href="/admin/reservas" className="hover:text-texto">← Volver a reservas</Link>
      </div>

      <PageHeader 
        title="Detalle de reserva" 
        action={<StatusBadge status={reserva.status as any} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-xl border-b border-crema-oscuro pb-2">Información de la sesión</h3>
            <div className="grid grid-cols-2 gap-4 font-sans text-sm">
              <div>
                <span className="text-texto-muted block mb-1">Servicio</span>
                <span className="text-texto font-medium">{reserva.services?.name}</span>
              </div>
              <div>
                <span className="text-texto-muted block mb-1">Fecha y hora</span>
                <span className="text-texto font-medium">
                  {new Date(reserva.starts_at).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
                </span>
              </div>
              <div>
                <span className="text-texto-muted block mb-1">Estado de pago</span>
                <span className="text-texto capitalize">{reserva.payment_status}</span>
              </div>
              <div>
                <span className="text-texto-muted block mb-1">Importe</span>
                <span className="text-texto">{reserva.price_charged ? `${reserva.price_charged}€` : 'Pendiente'}</span>
              </div>
            </div>
          </div>

          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-xl border-b border-crema-oscuro pb-2">Notas internas</h3>
            <div className="font-sans text-sm">
              {reserva.internal_notes ? (
                <p className="whitespace-pre-wrap">{reserva.internal_notes}</p>
              ) : (
                <p className="text-texto-muted italic">No hay notas internas para esta reserva.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-verde-oscuro text-blanco rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-xl border-b border-blanco/20 pb-2">Datos del cliente</h3>
            <div className="font-sans text-sm space-y-3">
              <div>
                <span className="text-blanco/60 block mb-1 text-xs uppercase tracking-wider">Nombre</span>
                <span className="font-medium">{reserva.clients?.name}</span>
              </div>
              <div>
                <span className="text-blanco/60 block mb-1 text-xs uppercase tracking-wider">Email</span>
                <a href={`mailto:${reserva.clients?.email}`} className="hover:underline">{reserva.clients?.email}</a>
              </div>
              {reserva.clients?.phone && (
                <div>
                  <span className="text-blanco/60 block mb-1 text-xs uppercase tracking-wider">Teléfono</span>
                  <a href={`tel:${reserva.clients?.phone}`} className="hover:underline">{reserva.clients?.phone}</a>
                </div>
              )}
              <div className="pt-4 mt-4 border-t border-blanco/20">
                <Link href={`/admin/clientes/${reserva.client_id}`} className="block text-center bg-blanco/10 hover:bg-blanco/20 py-2 rounded transition-colors w-full">
                  Ver ficha completa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
