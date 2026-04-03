import { Suspense } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatusBadge } from '@/components/dashboard/ui/StatusBadge'
import { TableSkeleton } from '@/components/dashboard/ui/Skeletons'
import { NuevaReservaModal } from '@/components/dashboard/reservas/NuevaReservaModal'
import { confirmarReserva, cancelarReserva, marcarRealizada } from './actions'
import { getServiciosActivos } from '@/lib/queries'
import pool from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

type SP = Promise<{ status?: string; fecha?: string; page?: string }>

// ─── Componentes de datos (streamed) ────────────────────────────────────────

async function TablaReservas({ searchParams }: { searchParams: SP }) {
  const { status: statusParam, fecha: fechaParam, page: pageParam } = await searchParams

  const page   = Math.max(1, parseInt(pageParam || '1', 10))
  const offset = (page - 1) * PAGE_SIZE

  // Build WHERE clause
  const whereParams: any[] = []
  let where = 'WHERE 1=1'
  if (statusParam && statusParam !== 'todas') {
    whereParams.push(statusParam)
    where += ` AND b.status = $${whereParams.length}`
  }
  if (fechaParam) {
    whereParams.push(fechaParam)
    where += ` AND b.starts_at::date = $${whereParams.length}::date`
  }

  // Parallel: data + count
  const [{ rows: reservas }, { rows: [{ total }] }] = await Promise.all([
    pool.query(
      `SELECT b.id, b.starts_at, b.status, b.payment_status,
         json_build_object('name', c.name) AS clients,
         json_build_object('name', s.name) AS services
       FROM bookings b
       JOIN clients c ON b.client_id = c.id
       JOIN services s ON b.service_id = s.id
       ${where}
       ORDER BY b.starts_at DESC
       LIMIT $${whereParams.length + 1} OFFSET $${whereParams.length + 2}`,
      [...whereParams, PAGE_SIZE, offset]
    ),
    pool.query(
      `SELECT COUNT(*)::int AS total
       FROM bookings b
       JOIN clients c ON b.client_id = c.id
       JOIN services s ON b.service_id = s.id
       ${where}`,
      whereParams
    ),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const hasPrev = page > 1
  const hasNext = page < totalPages

  // Preserve existing filters in pagination links
  const qs = new URLSearchParams()
  if (statusParam && statusParam !== 'todas') qs.set('status', statusParam)
  if (fechaParam) qs.set('fecha', fechaParam)
  const baseQs = qs.toString()
  const prevHref = `?${baseQs ? baseQs + '&' : ''}page=${page - 1}`
  const nextHref = `?${baseQs ? baseQs + '&' : ''}page=${page + 1}`

  return (
    <>
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
            {reservas.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-texto-muted">No se encontraron reservas</td>
              </tr>
            ) : (
              reservas.map((reserva: any) => (
                <tr key={reserva.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                  <td className="px-4 py-3">
                    {new Date(reserva.starts_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">{reserva.clients?.name}</td>
                  <td className="px-4 py-3">{reserva.services?.name}</td>
                  <td className="px-4 py-3"><StatusBadge status={reserva.status as any} /></td>
                  <td className="px-4 py-3 text-texto-muted capitalize">{reserva.payment_status}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {reserva.status === 'pending' && (
                        <form action={confirmarReserva.bind(null, reserva.id)}>
                          <button type="submit" className="text-verde hover:text-verde-medio underline">Confirmar</button>
                        </form>
                      )}
                      {reserva.status === 'confirmed' && (
                        <form action={marcarRealizada.bind(null, reserva.id)}>
                          <button type="submit" className="text-texto-muted hover:text-texto underline">Marcar realizada</button>
                        </form>
                      )}
                      {(reserva.status === 'pending' || reserva.status === 'confirmed') && (
                        <form action={cancelarReserva.bind(null, reserva.id)}>
                          <button type="submit" className="text-red-500 hover:text-red-700 underline">Cancelar</button>
                        </form>
                      )}
                      <Link href={`/admin/reservas/${reserva.id}`} className="text-texto-muted hover:text-texto underline">Ver</Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex justify-between items-center text-sm font-sans text-texto-muted">
        <span>
          {total === 0
            ? 'Sin resultados'
            : `${offset + 1}–${Math.min(offset + PAGE_SIZE, total)} de ${total} reservas`}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs">Página {page} de {Math.max(1, totalPages)}</span>
          {hasPrev ? (
            <Link href={prevHref} className="px-3 py-1 bg-blanco border border-crema-oscuro rounded hover:bg-crema transition-colors">
              Anterior
            </Link>
          ) : (
            <span className="px-3 py-1 bg-blanco border border-crema-oscuro rounded opacity-40 cursor-not-allowed">Anterior</span>
          )}
          {hasNext ? (
            <Link href={nextHref} className="px-3 py-1 bg-blanco border border-crema-oscuro rounded hover:bg-crema transition-colors">
              Siguiente
            </Link>
          ) : (
            <span className="px-3 py-1 bg-blanco border border-crema-oscuro rounded opacity-40 cursor-not-allowed">Siguiente</span>
          )}
        </div>
      </div>
    </>
  )
}

async function FiltrosReservas({ searchParams }: { searchParams: SP }) {
  const { status: statusParam, fecha: fechaParam } = await searchParams

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="bg-blanco border border-crema-oscuro rounded-lg p-1 flex font-sans text-sm">
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
      <form method="get">
        {statusParam && <input type="hidden" name="status" value={statusParam} />}
        <input
          type="date"
          name="fecha"
          defaultValue={fechaParam || ''}
          className="px-3 py-1.5 bg-blanco border border-crema-oscuro rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
        />
      </form>
    </div>
  )
}

async function NuevaReservaButton() {
  const servicios = await getServiciosActivos()
  return <NuevaReservaModal servicios={servicios} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReservasPage({ searchParams }: { searchParams: SP }) {
  return (
    <DashboardShell>
      <PageHeader
        title="Reservas"
        action={
          <Suspense fallback={<div className="h-9 w-32 bg-crema-oscuro/60 rounded-md animate-pulse" />}>
            <NuevaReservaButton />
          </Suspense>
        }
      />

      <Suspense fallback={<div className="h-9 w-80 bg-crema-oscuro/60 rounded-lg animate-pulse" />}>
        <FiltrosReservas searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<TableSkeleton cols={6} rows={6} />}>
        <TablaReservas searchParams={searchParams} />
      </Suspense>
    </DashboardShell>
  )
}
