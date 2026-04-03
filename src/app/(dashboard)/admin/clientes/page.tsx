import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ClientesPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = await createClient()
  const searchQuery = searchParams?.q
  
  let query = supabase.from('clients').select('*, bookings(count)').order('created_at', { ascending: false })
  
  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
  }

  const { data: clientes } = await query

  return (
    <DashboardShell>
      <PageHeader 
        title="Clientes" 
        description={`Total: ${clientes?.length || 0} clientes`}
        action={
          <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
            Nuevo cliente
          </button>
        } 
      />

      <div className="mb-6">
        <input 
          type="search" 
          placeholder="Buscar por nombre o email..."
          defaultValue={searchQuery}
          className="w-full md:w-96 px-4 py-2 bg-blanco border border-crema-oscuro rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
        />
      </div>

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
            {clientes?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-texto-muted">No se encontraron clientes</td>
              </tr>
            ) : (
              clientes?.map((cliente: any) => (
                <tr key={cliente.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                  <td className="px-4 py-3 font-medium text-texto">{cliente.name}</td>
                  <td className="px-4 py-3">{cliente.email}</td>
                  <td className="px-4 py-3">{cliente.phone || '-'}</td>
                  <td className="px-4 py-3">{new Date(cliente.created_at).toLocaleDateString('es-ES')}</td>
                  <td className="px-4 py-3 text-center">{cliente.bookings[0]?.count || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/clientes/${cliente.id}`} className="text-verde hover:text-verde-medio underline">Ver ficha</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  )
}
