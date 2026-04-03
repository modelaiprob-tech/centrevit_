import { Suspense } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatCard } from '@/components/dashboard/ui/StatCard'
import { StatCardSkeleton } from '@/components/dashboard/ui/Skeletons'
import { GraficaIngresos } from '@/components/dashboard/estadisticas/GraficaIngresos'
import { GraficaServicios } from '@/components/dashboard/estadisticas/GraficaServicios'
import pool from '@/lib/db'
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function getPeriodDates(period: string) {
  const now = new Date()
  if (period === '3m') return { startDate: startOfMonth(subMonths(now, 2)), endDate: now }
  if (period === 'prev') {
    const prev = subMonths(now, 1)
    return { startDate: startOfMonth(prev), endDate: endOfMonth(prev) }
  }
  return { startDate: startOfMonth(now), endDate: now }
}

async function StatsRow({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { period = '1m' } = await searchParams
  const { startDate, endDate } = getPeriodDates(period)

  const [
    { rows: pagos },
    { rows: [{ total_bookings }] },
    { rows: [{ cancelled_bookings }] },
    { rows: [{ new_clients }] },
    { rows: reservasDone },
  ] = await Promise.all([
    pool.query(`SELECT amount FROM payments WHERE paid_at >= $1 AND paid_at <= $2`, [startDate.toISOString(), endDate.toISOString()]),
    pool.query(`SELECT COUNT(*)::int AS total_bookings FROM bookings WHERE starts_at >= $1 AND starts_at <= $2`, [startDate.toISOString(), endDate.toISOString()]),
    pool.query(`SELECT COUNT(*)::int AS cancelled_bookings FROM bookings WHERE status = 'cancelled' AND starts_at >= $1 AND starts_at <= $2`, [startDate.toISOString(), endDate.toISOString()]),
    pool.query(`SELECT COUNT(*)::int AS new_clients FROM clients WHERE created_at >= $1 AND created_at <= $2`, [startDate.toISOString(), endDate.toISOString()]),
    pool.query(`SELECT id FROM bookings WHERE status = 'done' AND starts_at >= $1 AND starts_at <= $2`, [startDate.toISOString(), endDate.toISOString()]),
  ])

  const totalIngresos = pagos.reduce((sum: number, p: any) => sum + Number(p.amount), 0)
  const tasaCancelacion = total_bookings > 0 ? Math.round((cancelled_bookings / total_bookings) * 100) : 0

  return (
    <>
      <StatCard label="Ingresos totales" value={`${totalIngresos.toFixed(2)}€`} />
      <StatCard label="Sesiones realizadas" value={reservasDone.length} />
      <StatCard label="Clientes nuevos" value={new_clients} />
      <StatCard label="Tasa cancelación" value={`${tasaCancelacion}%`} alert={tasaCancelacion > 15} />
    </>
  )
}

async function GraficasYTop({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { period = '1m' } = await searchParams
  const { startDate, endDate } = getPeriodDates(period)

  const [{ rows: pagos }, { rows: reservasDone }] = await Promise.all([
    pool.query(`SELECT amount, paid_at FROM payments WHERE paid_at >= $1 AND paid_at <= $2`, [startDate.toISOString(), endDate.toISOString()]),
    pool.query(`
      SELECT b.id, b.client_id, b.price_charged,
        json_build_object('name', c.name) AS clients,
        json_build_object('name', s.name) AS services
      FROM bookings b
      JOIN clients c ON b.client_id = c.id
      JOIN services s ON b.service_id = s.id
      WHERE b.status = 'done' AND b.starts_at >= $1 AND b.starts_at <= $2
    `, [startDate.toISOString(), endDate.toISOString()]),
  ])

  // Line chart: payments grouped by date
  const byDate: Record<string, number> = {}
  for (const p of pagos) {
    const d = new Date(p.paid_at).toISOString().split('T')[0]
    byDate[d] = (byDate[d] || 0) + Number(p.amount)
  }
  const dataIngresos = Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, amount]) => ({ date, amount }))

  // Bar chart: done bookings grouped by service
  const byService: Record<string, { count: number; revenue: number }> = {}
  for (const b of reservasDone) {
    const name = b.services?.name || 'Sin servicio'
    if (!byService[name]) byService[name] = { count: 0, revenue: 0 }
    byService[name].count++
    byService[name].revenue += Number(b.price_charged || 0)
  }
  const dataServicios = Object.entries(byService)
    .map(([service, v]) => ({ service, ...v }))
    .sort((a, b) => b.count - a.count)

  // Top clients
  const byClient: Record<string, { name: string; sessions: number; revenue: number }> = {}
  for (const b of reservasDone) {
    if (!b.client_id) continue
    const name = b.clients?.name || 'Desconocido'
    if (!byClient[b.client_id]) byClient[b.client_id] = { name, sessions: 0, revenue: 0 }
    byClient[b.client_id].sessions++
    byClient[b.client_id].revenue += Number(b.price_charged || 0)
  }
  const topClientes = Object.values(byClient).sort((a, b) => b.sessions - a.sessions).slice(0, 8)

  return (
    <>
      <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
        <h3 className="font-sans font-medium text-lg text-texto mb-6">Ingresos</h3>
        {dataIngresos.length > 0
          ? <GraficaIngresos data={dataIngresos} />
          : <p className="text-sm text-texto-muted text-center py-12">No hay ingresos registrados en este periodo</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h3 className="font-sans font-medium text-lg text-texto mb-6">Sesiones por servicio</h3>
          {dataServicios.length > 0
            ? <GraficaServicios data={dataServicios} />
            : <p className="text-sm text-texto-muted text-center py-12">No hay sesiones en este periodo</p>}
        </div>
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h3 className="font-sans font-medium text-lg text-texto mb-4">Top clientes</h3>
          {topClientes.length === 0 ? (
            <p className="text-sm text-texto-muted text-center py-12">No hay datos en este periodo</p>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-crema-oscuro text-texto-muted">
                  <th className="pb-2 text-left font-medium">Cliente</th>
                  <th className="pb-2 text-center font-medium">Sesiones</th>
                  <th className="pb-2 text-right font-medium">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {topClientes.map((c, i) => (
                  <tr key={i} className="border-b border-crema-oscuro/50 last:border-0">
                    <td className="py-2 text-texto">{c.name}</td>
                    <td className="py-2 text-center text-texto-muted">{c.sessions}</td>
                    <td className="py-2 text-right font-medium">{c.revenue.toFixed(2)}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default function EstadisticasPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  return (
    <DashboardShell>
      <Suspense fallback={<div className="h-8 w-48 bg-crema-oscuro/60 rounded animate-pulse mb-6" />}>
        <HeaderConFiltros searchParams={searchParams} />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Suspense fallback={<><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>}>
          <StatsRow searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={
        <div className="space-y-6">
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
            <div className="h-5 w-24 bg-crema-oscuro/60 rounded animate-pulse mb-6" />
            <div className="h-48 w-full bg-crema-oscuro/60 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[0, 1].map(i => (
              <div key={i} className="bg-blanco border border-crema-oscuro rounded-lg p-6">
                <div className="h-5 w-36 bg-crema-oscuro/60 rounded animate-pulse mb-6" />
                <div className="h-40 w-full bg-crema-oscuro/60 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      }>
        <GraficasYTop searchParams={searchParams} />
      </Suspense>
    </DashboardShell>
  )
}

async function HeaderConFiltros({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { period = '1m' } = await searchParams
  return (
    <PageHeader
      title="Estadísticas"
      action={
        <div className="flex bg-crema p-1 rounded-lg border border-crema-oscuro font-sans text-sm">
          <Link href="?period=1m" className={`px-4 py-1.5 rounded-md transition-colors ${period === '1m' ? 'bg-blanco text-texto shadow-sm' : 'text-texto-muted hover:text-texto'}`}>Este mes</Link>
          <Link href="?period=prev" className={`px-4 py-1.5 rounded-md transition-colors ${period === 'prev' ? 'bg-blanco text-texto shadow-sm' : 'text-texto-muted hover:text-texto'}`}>Mes anterior</Link>
          <Link href="?period=3m" className={`px-4 py-1.5 rounded-md transition-colors ${period === '3m' ? 'bg-blanco text-texto shadow-sm' : 'text-texto-muted hover:text-texto'}`}>Últimos 3 meses</Link>
        </div>
      }
    />
  )
}
