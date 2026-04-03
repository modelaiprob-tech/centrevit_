import { Suspense } from 'react'
import { StatCard } from '@/components/dashboard/ui/StatCard'
import { StatusBadge } from '@/components/dashboard/ui/StatusBadge'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { DashboardTopbar } from '@/components/dashboard/layout/DashboardTopbar'
import { StatCardSkeleton, TableSkeleton } from '@/components/dashboard/ui/Skeletons'
import { marcarSeguimientoRealizado } from './reservas/actions'
import { createClient } from '@/lib/supabase/server'
import pool from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// ─── Componentes de datos (streamed) ────────────────────────────────────────

async function Stats() {
  const [
    { rows: reservasHoy },
    { rows: [{ count: pendientesCount }] },
    { rows: [{ count: totalClientes }] },
    { rows: seguimientosPendientes },
  ] = await Promise.all([
    pool.query(`
      SELECT id FROM bookings
      WHERE starts_at::date = CURRENT_DATE AND status != 'cancelled'
    `),
    pool.query(`SELECT COUNT(*) FROM bookings WHERE status = 'pending'`),
    pool.query(`SELECT COUNT(*) FROM clients WHERE active = true`),
    pool.query(`
      SELECT id FROM bookings
      WHERE followup_done = false AND followup_date IS NOT NULL AND followup_date <= NOW()
    `),
  ])

  return (
    <>
      <StatCard label="Citas hoy" value={reservasHoy.length} />
      <StatCard label="Pendientes de confirmar" value={Number(pendientesCount)} alert={Number(pendientesCount) > 0} />
      <StatCard label="Total clientes" value={Number(totalClientes)} />
      <StatCard label="Seguimientos pendientes" value={seguimientosPendientes.length} alert={seguimientosPendientes.length > 0} />
    </>
  )
}

async function CitasHoy() {
  const { rows: reservasHoy } = await pool.query(`
    SELECT b.id, b.starts_at, b.status,
      json_build_object('name', c.name) AS clients,
      json_build_object('name', s.name) AS services
    FROM bookings b
    JOIN clients c ON b.client_id = c.id
    JOIN services s ON b.service_id = s.id
    WHERE b.starts_at::date = CURRENT_DATE
      AND b.status != 'cancelled'
    ORDER BY b.starts_at
  `)

  return (
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
          {!reservasHoy.length ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-texto-muted">No hay citas para hoy</td>
            </tr>
          ) : (
            reservasHoy.map((reserva: any) => (
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
  )
}

async function Seguimientos() {
  const { rows: seguimientosPendientes } = await pool.query(`
    SELECT b.id, b.starts_at, b.followup_date, b.followup_done,
      json_build_object('name', c.name) AS clients,
      json_build_object('name', s.name, 'followup_days', s.followup_days) AS services
    FROM bookings b
    JOIN clients c ON b.client_id = c.id
    JOIN services s ON b.service_id = s.id
    WHERE b.followup_done = false
      AND b.followup_date IS NOT NULL
      AND b.followup_date <= NOW()
    ORDER BY b.followup_date
  `)

  return (
    <div className="bg-blanco border border-crema-oscuro rounded-lg p-4 space-y-4">
      {!seguimientosPendientes.length ? (
        <p className="text-sm font-sans text-texto-muted text-center py-4">No hay seguimientos pendientes.</p>
      ) : (
        seguimientosPendientes.map((seg: any) => (
          <div key={seg.id} className="border-b border-crema-oscuro last:border-0 pb-4 last:pb-0">
            <p className="font-sans text-sm font-medium text-texto">{seg.clients?.name}</p>
            <p className="font-sans text-xs text-texto-muted">{seg.services?.name}</p>
            <p className="font-sans text-xs text-texto-muted mb-2">Hace {seg.services?.followup_days} días</p>
            <form action={marcarSeguimientoRealizado.bind(null, seg.id)}>
              <button type="submit" className="text-xs bg-crema hover:bg-crema-oscuro text-texto px-3 py-1.5 rounded-md transition-colors w-full border border-crema-oscuro">
                Marcar realizado
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <DashboardTopbar user={user} />
      <DashboardShell>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Suspense fallback={<><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>}>
            <Stats />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-sans font-medium text-lg text-texto">Citas de hoy</h2>
            <Suspense fallback={<TableSkeleton cols={5} rows={3} />}>
              <CitasHoy />
            </Suspense>
          </div>

          <div className="space-y-4">
            <h2 className="font-sans font-medium text-lg text-texto">Seguimientos pendientes</h2>
            <Suspense fallback={
              <div className="bg-blanco border border-crema-oscuro rounded-lg p-4 space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2 pb-4 border-b border-crema-oscuro animate-pulse">
                    <div className="h-4 w-32 bg-crema-oscuro/60 rounded" />
                    <div className="h-3 w-24 bg-crema-oscuro/60 rounded" />
                    <div className="h-8 w-full bg-crema-oscuro/60 rounded-md" />
                  </div>
                ))}
              </div>
            }>
              <Seguimientos />
            </Suspense>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
