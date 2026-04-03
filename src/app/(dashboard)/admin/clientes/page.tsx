import { Suspense } from 'react'
import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { TableSkeleton } from '@/components/dashboard/ui/Skeletons'
import { NuevoClienteModal } from '@/components/dashboard/clientes/NuevoClienteModal'
import pool from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function TablaClientes({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: searchQuery } = await searchParams

  const params: any[] = []
  let sql = `
    SELECT c.id, c.name, c.email, c.phone, c.created_at, c.active,
      COUNT(b.id)::int AS booking_count
    FROM clients c
    LEFT JOIN bookings b ON b.client_id = c.id
    WHERE 1=1
  `
  if (searchQuery) {
    params.push(`%${searchQuery}%`)
    sql += ` AND (c.name ILIKE $${params.length} OR c.email ILIKE $${params.length})`
  }
  sql += ' GROUP BY c.id ORDER BY c.created_at DESC'

  const { rows: clientes } = await pool.query(sql, params)

  return (
    <>
      <p className="text-sm font-sans text-texto-muted -mt-4 mb-2">Total: {clientes.length} clientes</p>
      <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left font-sans">
          <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Teléfono</th>
              <th className="px-4 py-3 font-medium">Fecha alta</th>
              <th className="px-4 py-3 font-medium text-center">Nº sesiones</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-texto-muted">No se encontraron clientes</td>
              </tr>
            ) : (
              clientes.map((cliente: any) => (
                <tr key={cliente.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                  <td className="px-4 py-3 font-medium text-texto">{cliente.name}</td>
                  <td className="px-4 py-3">{cliente.email}</td>
                  <td className="px-4 py-3">{cliente.phone || '-'}</td>
                  <td className="px-4 py-3">{new Date(cliente.created_at).toLocaleDateString('es-ES')}</td>
                  <td className="px-4 py-3 text-center">{cliente.booking_count}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/clientes/${cliente.id}`} className="text-verde hover:text-verde-medio underline">Ver ficha</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

async function BuscadorClientes({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: searchQuery } = await searchParams
  return (
    <form method="get" className="mb-6">
      <input
        type="search"
        name="q"
        placeholder="Buscar por nombre o email..."
        defaultValue={searchQuery}
        className="w-full md:w-96 px-4 py-2 bg-blanco border border-crema-oscuro rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
      />
    </form>
  )
}

export default function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  return (
    <DashboardShell>
      <PageHeader title="Clientes" action={<NuevoClienteModal />} />

      <Suspense fallback={<div className="h-10 w-96 bg-crema-oscuro/60 rounded-lg animate-pulse mb-6" />}>
        <BuscadorClientes searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<TableSkeleton cols={6} rows={7} />}>
        <TablaClientes searchParams={searchParams} />
      </Suspense>
    </DashboardShell>
  )
}
