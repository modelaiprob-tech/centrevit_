import { Suspense } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatCard } from '@/components/dashboard/ui/StatCard'
import { StatCardSkeleton, TableSkeleton } from '@/components/dashboard/ui/Skeletons'
import { RegistrarPagoModal } from '@/components/dashboard/caja/RegistrarPagoModal'
import { getClientesActivos } from '@/lib/queries'
import pool from '@/lib/db'

export const dynamic = 'force-dynamic'

async function RegistrarPagoButton() {
  const clientes = await getClientesActivos()
  return <RegistrarPagoModal clientes={clientes} />
}

async function ResumenCaja({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams
  const selectedMonth = date || new Date().toISOString().slice(0, 7)
  const [year, month] = selectedMonth.split('-').map(Number)
  const startDate = new Date(year, month - 1, 1).toISOString()
  const endDate = new Date(year, month, 1).toISOString()

  const { rows: pagos } = await pool.query(
    `SELECT amount FROM payments WHERE paid_at >= $1 AND paid_at < $2`,
    [startDate, endDate]
  )

  const total = pagos.reduce((sum: number, p: any) => sum + Number(p.amount), 0)
  const count = pagos.length
  const ticketMedio = count > 0 ? (total / count).toFixed(2) : '0.00'

  return (
    <>
      <StatCard label="Total ingresos (mes)" value={`${total.toFixed(2)}€`} />
      <StatCard label="Pagos registrados" value={count} />
      <StatCard label="Ticket medio" value={`${ticketMedio}€`} />
    </>
  )
}

async function TablaPagos({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams
  const selectedMonth = date || new Date().toISOString().slice(0, 7)
  const [year, month] = selectedMonth.split('-').map(Number)
  const startDate = new Date(year, month - 1, 1).toISOString()
  const endDate = new Date(year, month, 1).toISOString()

  const { rows: pagos } = await pool.query(`
    SELECT p.*,
      CASE WHEN p.client_id IS NOT NULL
        THEN json_build_object('name', c.name)
        ELSE NULL END AS clients,
      CASE WHEN p.booking_id IS NOT NULL
        THEN json_build_object('services', json_build_object('name', s.name))
        ELSE NULL END AS bookings
    FROM payments p
    LEFT JOIN clients c ON p.client_id = c.id
    LEFT JOIN bookings b ON p.booking_id = b.id
    LEFT JOIN services s ON b.service_id = s.id
    WHERE p.paid_at >= $1 AND p.paid_at < $2
    ORDER BY p.paid_at DESC
  `, [startDate, endDate])

  const methodLabel: Record<string, string> = { cash: 'Efectivo', card: 'Tarjeta', transfer: 'Transferencia' }

  return (
    <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left font-sans">
        <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Cliente</th>
            <th className="px-4 py-3 font-medium">Servicio / Concepto</th>
            <th className="px-4 py-3 font-medium text-right">Importe</th>
            <th className="px-4 py-3 font-medium">Método</th>
          </tr>
        </thead>
        <tbody>
          {!pagos.length ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-texto-muted">No hay ingresos registrados este mes</td>
            </tr>
          ) : (
            pagos.map((pago: any) => (
              <tr key={pago.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                <td className="px-4 py-3">{new Date(pago.paid_at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</td>
                <td className="px-4 py-3 font-medium text-texto">{pago.clients?.name || '-'}</td>
                <td className="px-4 py-3">{pago.bookings?.services?.name || pago.notes || '-'}</td>
                <td className="px-4 py-3 text-right font-medium">{Number(pago.amount).toFixed(2)}€</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${pago.method === 'cash' ? 'bg-verde-claro/20 text-verde' : pago.method === 'card' ? 'bg-dorado-claro text-dorado' : 'bg-crema text-texto-muted'}`}>
                    {methodLabel[pago.method] || pago.method}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

async function FiltroMes({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams
  const selectedMonth = date || new Date().toISOString().slice(0, 7)
  return (
    <form method="get" className="flex mb-6">
      <input
        type="month"
        name="date"
        defaultValue={selectedMonth}
        className="px-3 py-1.5 bg-blanco border border-crema-oscuro rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
      />
    </form>
  )
}

export default function CajaPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  return (
    <DashboardShell>
      <PageHeader
        title="Caja e Ingresos"
        action={
          <Suspense fallback={<div className="h-9 w-36 bg-crema-oscuro/60 rounded-md animate-pulse" />}>
            <RegistrarPagoButton />
          </Suspense>
        }
      />

      <Suspense fallback={<div className="h-9 w-36 bg-crema-oscuro/60 rounded-lg animate-pulse mb-6" />}>
        <FiltroMes searchParams={searchParams} />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Suspense fallback={<><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>}>
          <ResumenCaja searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<TableSkeleton cols={5} rows={6} />}>
        <TablaPagos searchParams={searchParams} />
      </Suspense>
    </DashboardShell>
  )
}
