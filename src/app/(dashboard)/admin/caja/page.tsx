import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatCard } from '@/components/dashboard/ui/StatCard'

export const dynamic = 'force-dynamic'

export default async function CajaPage({ searchParams }: { searchParams: { date?: string } }) {
  // Mock data for shell
  const pagos = [
    { id: '1', date: new Date(), client: 'María García', amount: 60, method: 'cash', service: 'Reflexología' },
    { id: '2', date: new Date(), client: 'Carlos Sánchez', amount: 50, method: 'card', service: 'Par Biomagnético' }
  ]

  return (
    <DashboardShell>
      <PageHeader 
        title="Caja e Ingresos" 
        action={
          <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
            Registrar pago
          </button>
        } 
      />

      <div className="flex mb-6">
        <input 
          type="month" 
          defaultValue={searchParams?.date || new Date().toISOString().slice(0, 7)}
          className="px-3 py-1.5 bg-blanco border border-crema-oscuro rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard label="Total ingresos (mes)" value="110€" />
        <StatCard label="Pagos registrados" value="2" />
        <StatCard label="Ticket medio" value="55€" />
      </div>

      <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left font-sans">
          <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Servicio</th>
              <th className="px-4 py-3 font-medium text-right">Importe</th>
              <th className="px-4 py-3 font-medium">Método</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago: any) => (
              <tr key={pago.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                <td className="px-4 py-3">{pago.date.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</td>
                <td className="px-4 py-3 font-medium text-texto">{pago.client}</td>
                <td className="px-4 py-3">{pago.service}</td>
                <td className="px-4 py-3 text-right font-medium">{pago.amount}€</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${pago.method === 'cash' ? 'bg-verde-claro/20 text-verde' : 'bg-dorado-claro text-dorado'}`}>
                    {pago.method === 'cash' ? 'Efectivo' : 'Tarjeta'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-texto-muted hover:text-texto underline">Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  )
}
