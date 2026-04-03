import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { FichaTecnica } from '@/components/dashboard/clientes/FichaTecnica'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ClienteDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: cliente } = await supabase.from('clients').select('*').eq('id', params.id).single()
  
  if (!cliente) notFound()

  // In a real app we'd fetch bookings and followup here
  const { data: bookings } = await supabase.from('bookings').select('*, services(*)').eq('client_id', params.id).order('starts_at', { ascending: false })

  return (
    <DashboardShell>
      <div className="mb-4 text-sm font-sans text-texto-muted">
        <Link href="/admin/clientes" className="hover:text-texto">← Volver a clientes</Link>
      </div>

      <PageHeader 
        title={cliente.name} 
        description={`Cliente desde ${new Date(cliente.created_at).toLocaleDateString('es-ES')}`}
      />

      <FichaTecnica cliente={cliente} bookings={bookings || []} />
    </DashboardShell>
  )
}
