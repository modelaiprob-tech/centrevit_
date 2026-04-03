import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { FichaTecnica } from '@/components/dashboard/clientes/FichaTecnica'
import pool from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ClienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [{ rows: [cliente] }, { rows: bookings }] = await Promise.all([
    pool.query(`SELECT * FROM clients WHERE id = $1`, [id]),
    pool.query(`
      SELECT b.*,
        json_build_object('name', s.name, 'followup_days', s.followup_days) AS services
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      WHERE b.client_id = $1
      ORDER BY b.starts_at DESC
    `, [id]),
  ])

  if (!cliente) notFound()

  return (
    <DashboardShell>
      <div className="mb-4 text-sm font-sans text-texto-muted">
        <Link href="/admin/clientes" className="hover:text-texto">← Volver a clientes</Link>
      </div>

      <PageHeader
        title={cliente.name}
        description={`Cliente desde ${new Date(cliente.created_at).toLocaleDateString('es-ES')}`}
      />

      <FichaTecnica cliente={cliente} bookings={bookings} />
    </DashboardShell>
  )
}
