import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatusBadge } from '@/components/dashboard/ui/StatusBadge'
import pool from '@/lib/db'
import { confirmarReserva, cancelarReserva, marcarRealizada, actualizarNotasInternas } from '../actions'
import { EditarReservaModal } from '@/components/dashboard/reservas/EditarReservaModal'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ReservaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { rows: [reserva] } = await pool.query(`
    SELECT b.*,
      json_build_object('id', c.id, 'name', c.name, 'email', c.email, 'phone', c.phone) AS clients,
      json_build_object('id', s.id, 'name', s.name) AS services
    FROM bookings b
    JOIN clients c ON b.client_id = c.id
    JOIN services s ON b.service_id = s.id
    WHERE b.id = $1
  `, [id])

  if (!reserva) notFound()

  async function guardarNotas(formData: FormData) {
    'use server'
    const notes = (formData.get('notes') as string) || ''
    await actualizarNotasInternas(id, notes)
  }

  const canConfirm = reserva.status === 'pending'
  const canCancel = reserva.status === 'pending' || reserva.status === 'confirmed'
  const canMarkDone = reserva.status === 'confirmed'

  return (
    <DashboardShell>
      <div className="mb-4 text-sm font-sans text-texto-muted">
        <Link href="/admin/reservas" className="hover:text-texto">← Volver a reservas</Link>
      </div>

      <PageHeader
        title="Detalle de reserva"
        action={
          <div className="flex items-center gap-3">
            <EditarReservaModal bookingId={reserva.id} currentStartsAt={reserva.starts_at} />
            <StatusBadge status={reserva.status as any} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-4">
            <h3 className="font-sans font-medium text-lg border-b border-crema-oscuro pb-2">Información de la sesión</h3>
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
                <span className="text-texto">{reserva.price_charged ? `${Number(reserva.price_charged).toFixed(2)}€` : 'Pendiente'}</span>
              </div>
            </div>
          </div>

          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-3">
            <h3 className="font-sans font-medium text-lg border-b border-crema-oscuro pb-2">Notas internas</h3>
            <form action={guardarNotas} className="space-y-3">
              <textarea
                name="notes"
                defaultValue={reserva.internal_notes || ''}
                rows={4}
                placeholder="Notas internas sobre esta sesión..."
                className="w-full p-3 bg-crema/30 border border-crema-oscuro rounded-md text-sm font-sans focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde resize-none"
              />
              <button type="submit" className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md text-sm font-sans transition-colors">
                Guardar notas
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-verde-oscuro text-blanco rounded-lg p-6 space-y-4">
            <h3 className="font-sans font-medium text-lg border-b border-blanco/20 pb-2">Datos del cliente</h3>
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
                <Link href={`/admin/clientes/${reserva.client_id}`} className="block text-center bg-blanco/10 hover:bg-blanco/20 py-2 rounded transition-colors w-full text-sm">
                  Ver ficha completa
                </Link>
              </div>
            </div>
          </div>

          {(canConfirm || canCancel || canMarkDone) && (
            <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-3">
              <h3 className="font-sans font-medium text-base border-b border-crema-oscuro pb-2">Acciones</h3>
              {canConfirm && (
                <form action={confirmarReserva.bind(null, reserva.id)}>
                  <button type="submit" className="w-full bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md text-sm font-sans transition-colors">
                    Confirmar reserva
                  </button>
                </form>
              )}
              {canMarkDone && (
                <form action={marcarRealizada.bind(null, reserva.id)}>
                  <button type="submit" className="w-full bg-crema hover:bg-crema-oscuro text-texto border border-crema-oscuro px-4 py-2 rounded-md text-sm font-sans transition-colors">
                    Marcar como realizada
                  </button>
                </form>
              )}
              {canCancel && (
                <form action={cancelarReserva.bind(null, reserva.id)}>
                  <button type="submit" className="w-full bg-blanco border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-sans transition-colors">
                    Cancelar reserva
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
