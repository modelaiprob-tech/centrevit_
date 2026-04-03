import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'

export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  return (
    <DashboardShell>
      <PageHeader title="Configuración" />

      <div className="space-y-8 font-sans">
        <section className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h2 className="text-lg font-medium text-texto mb-4 border-b border-crema-oscuro pb-2">Datos del centro</h2>
          <div className="space-y-4 max-w-2xl text-sm">
            <div>
              <label className="block text-texto-muted mb-1">Nombre</label>
              <input type="text" defaultValue="Centrevit" className="w-full p-2 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20" />
            </div>
            <div>
              <label className="block text-texto-muted mb-1">Email de contacto</label>
              <input type="email" defaultValue="javierxy@hotmail.com" className="w-full p-2 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20" />
            </div>
            <button className="bg-verde text-blanco hover:bg-verde-medio px-4 py-2 rounded-md transition-colors mt-2">
              Guardar datos
            </button>
          </div>
        </section>

        <section className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h2 className="text-lg font-medium text-texto mb-4 border-b border-crema-oscuro pb-2">Horarios</h2>
          <div className="text-sm text-texto-muted max-w-2xl">
            <p className="mb-4">Configura los horarios disponibles de apertura por defecto para el widget de reservas.</p>
            {/* Shell for schedules grid */}
            <div className="p-4 border border-crema-oscuro rounded bg-crema/30 text-center italic">
              Configurador de horarios (Shell)
            </div>
          </div>
        </section>

        <section className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h2 className="text-lg font-medium text-texto mb-4 border-b border-crema-oscuro pb-2">Notificaciones</h2>
          <div className="text-sm text-texto-muted space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-crema-oscuro text-verde focus:ring-verde" />
              Notificarme por email con cada nueva reserva web
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-crema-oscuro text-verde focus:ring-verde" />
              Enviar recordatorio de cita a pacientes 24h antes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-crema-oscuro text-verde focus:ring-verde" />
              Enviar email protocolario para los seguimientos
            </label>
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
