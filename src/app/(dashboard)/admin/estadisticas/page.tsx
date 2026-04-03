import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import { StatCard } from '@/components/dashboard/ui/StatCard'
import { GraficaIngresos } from '@/components/dashboard/estadisticas/GraficaIngresos'
import { GraficaServicios } from '@/components/dashboard/estadisticas/GraficaServicios'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EstadisticasPage({ searchParams }: { searchParams: { period?: string } }) {
  const period = searchParams?.period || '1m'
  
  // mock data
  const dataIngresos = [
    { date: '2026-03-01', amount: 150 },
    { date: '2026-03-05', amount: 200 },
    { date: '2026-03-10', amount: 80 },
    { date: '2026-03-15', amount: 300 }
  ]
  const dataServicios = [
    { service: 'Par Biomagnético', count: 45, revenue: 2700 },
    { service: 'Reflexología', count: 30, revenue: 1500 }
  ]

  return (
    <DashboardShell>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Ingresos totales" value="4.250€" />
        <StatCard label="Sesiones realizadas" value="85" />
        <StatCard label="Clientes nuevos" value="12" />
        <StatCard label="Tasa cancelación" value="4%" />
      </div>

      <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
        <h3 className="font-sans font-medium text-lg text-texto mb-6">Ingresos</h3>
        <GraficaIngresos data={dataIngresos} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h3 className="font-sans font-medium text-lg text-texto mb-6">Sesiones por servicio</h3>
          <GraficaServicios data={dataServicios} />
        </div>
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 flex flex-col items-center justify-center text-sm text-texto-muted">
          (Tabla top clientes - Shell)
        </div>
      </div>
    </DashboardShell>
  )
}
