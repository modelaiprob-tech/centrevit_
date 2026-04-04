import { DashboardShell } from '@/components/dashboard/layout/DashboardShell'
import { PageHeader } from '@/components/dashboard/ui/PageHeader'
import pool from '@/lib/db'
import { guardarDatosCentro, guardarHorarios, guardarPreferencias } from './actions'

export const dynamic = 'force-dynamic'

const DIAS = [
  { key: 'lunes',     label: 'Lunes',     dow: 1 },
  { key: 'martes',    label: 'Martes',    dow: 2 },
  { key: 'miercoles', label: 'Miércoles', dow: 3 },
  { key: 'jueves',    label: 'Jueves',    dow: 4 },
  { key: 'viernes',   label: 'Viernes',   dow: 5 },
  { key: 'sabado',    label: 'Sábado',    dow: 6 },
  { key: 'domingo',   label: 'Domingo',   dow: 0 },
]

const HORARIOS_DEFAULT: Record<string, { activo: boolean; inicio: string; fin: string }> = {
  lunes:     { activo: true,  inicio: '09:00', fin: '19:00' },
  martes:    { activo: true,  inicio: '09:00', fin: '19:00' },
  miercoles: { activo: true,  inicio: '09:00', fin: '19:00' },
  jueves:    { activo: true,  inicio: '09:00', fin: '19:00' },
  viernes:   { activo: true,  inicio: '09:00', fin: '14:00' },
  sabado:    { activo: false, inicio: '10:00', fin: '14:00' },
  domingo:   { activo: false, inicio: '10:00', fin: '14:00' },
}

export default async function SettingsPage() {
  const [{ rows: [tenant] }, { rows: horariosBD }] = await Promise.all([
    pool.query(`SELECT * FROM tenants WHERE slug = 'centrevit'`),
    pool.query(`
      SELECT day_of_week, start_time AS open_time, end_time AS close_time, active AS is_open
      FROM schedules
      WHERE tenant_id = (SELECT id FROM tenants WHERE slug = 'centrevit')
    `),
  ])

  // Merge DB horarios con defaults
  const horarioMap: Record<number, { is_open: boolean; open_time: string; close_time: string }> = {}
  for (const h of horariosBD) {
    horarioMap[h.day_of_week] = h
  }

  const settings = tenant?.settings ?? {}

  return (
    <DashboardShell>
      <PageHeader title="Configuración" />

      <div className="space-y-8 font-sans">

        {/* Datos del centro */}
        <section className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h2 className="text-lg font-medium text-texto mb-4 border-b border-crema-oscuro pb-2">Datos del centro</h2>
          <form action={guardarDatosCentro} className="space-y-4 max-w-2xl text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-texto-muted mb-1">Nombre del centro</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={tenant?.name ?? 'Centrevit'}
                  className="w-full p-2 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                />
              </div>
              <div>
                <label className="block text-texto-muted mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={tenant?.phone ?? '679 41 71 38'}
                  className="w-full p-2 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-texto-muted mb-1">Email de contacto</label>
              <input
                type="email"
                name="email"
                defaultValue={tenant?.email ?? ''}
                className="w-full p-2 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              />
            </div>
            <div>
              <label className="block text-texto-muted mb-1">Dirección</label>
              <input
                type="text"
                name="address"
                defaultValue={tenant?.address ?? 'C. José Ramón Castro Álava, 41, 2ºA, 31500 Tudela'}
                className="w-full p-2 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              />
            </div>
            <button type="submit" className="bg-verde text-blanco hover:bg-verde-medio px-4 py-2 rounded-md transition-colors text-sm">
              Guardar datos
            </button>
          </form>
        </section>

        {/* Horarios */}
        <section className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h2 className="text-lg font-medium text-texto mb-1 border-b border-crema-oscuro pb-2">Horarios de apertura</h2>
          <p className="text-xs text-texto-muted mb-5 mt-3">Horarios disponibles por defecto para el widget de reservas de la web pública.</p>

          <form action={guardarHorarios}>
            <div className="max-w-2xl space-y-2">
              <div className="grid grid-cols-[100px_56px_1fr_16px_1fr] items-center gap-3 px-2 pb-1 border-b border-crema-oscuro text-xs text-texto-muted uppercase tracking-wide">
                <span>Día</span>
                <span>Activo</span>
                <span>Apertura</span>
                <span />
                <span>Cierre</span>
              </div>

              {DIAS.map(({ key, label, dow }) => {
                const fromDB = horarioMap[dow]
                const def = HORARIOS_DEFAULT[key]
                const activo = fromDB ? fromDB.is_open : def.activo
                const inicio = fromDB ? String(fromDB.open_time).slice(0, 5) : def.inicio
                const fin    = fromDB ? String(fromDB.close_time).slice(0, 5) : def.fin

                return (
                  <div
                    key={key}
                    className="grid grid-cols-[100px_56px_1fr_16px_1fr] items-center gap-3 px-2 py-1.5 rounded-md hover:bg-crema/30 transition-colors text-sm"
                  >
                    <span className="text-texto font-medium">{label}</span>
                    <label className="flex justify-center">
                      <input
                        type="checkbox"
                        name={`${key}_activo`}
                        defaultChecked={activo}
                        className="w-4 h-4 rounded border-crema-oscuro accent-verde cursor-pointer"
                      />
                    </label>
                    <input
                      type="time"
                      name={`${key}_inicio`}
                      defaultValue={inicio}
                      className="w-full p-1.5 bg-crema/30 border border-crema-oscuro rounded-md text-sm focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                    />
                    <span className="text-texto-muted text-center">–</span>
                    <input
                      type="time"
                      name={`${key}_fin`}
                      defaultValue={fin}
                      className="w-full p-1.5 bg-crema/30 border border-crema-oscuro rounded-md text-sm focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                    />
                  </div>
                )
              })}
            </div>

            <button type="submit" className="mt-5 bg-verde text-blanco hover:bg-verde-medio px-4 py-2 rounded-md transition-colors text-sm">
              Guardar horarios
            </button>
          </form>
        </section>

        {/* Notificaciones */}
        <section className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <h2 className="text-lg font-medium text-texto mb-4 border-b border-crema-oscuro pb-2">Notificaciones</h2>
          <form action={guardarPreferencias}>
            <div className="text-sm text-texto space-y-4">
              {[
                { id: 'notif-nueva-reserva',   label: 'Notificarme por email con cada nueva reserva web',  key: 'notif_nueva_reserva'   },
                { id: 'notif-recordatorio-24', label: 'Enviar recordatorio de cita a pacientes 24h antes', key: 'notif_recordatorio_24' },
                { id: 'notif-recordatorio-2',  label: 'Enviar recordatorio de cita a pacientes 2h antes',  key: 'notif_recordatorio_2'  },
                { id: 'notif-seguimiento',     label: 'Enviar email protocolario para los seguimientos',   key: 'notif_seguimiento'     },
              ].map(({ id, label, key }) => (
                <label key={id} htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    id={id}
                    name={id}
                    type="checkbox"
                    defaultChecked={settings[key] !== false}
                    className="mt-0.5 w-4 h-4 rounded border-crema-oscuro accent-verde cursor-pointer shrink-0"
                  />
                  <span className="text-texto-muted group-hover:text-texto transition-colors leading-snug">{label}</span>
                </label>
              ))}
            </div>
            <button type="submit" className="mt-5 bg-verde text-blanco hover:bg-verde-medio px-4 py-2 rounded-md transition-colors text-sm">
              Guardar preferencias
            </button>
          </form>
        </section>

      </div>
    </DashboardShell>
  )
}
