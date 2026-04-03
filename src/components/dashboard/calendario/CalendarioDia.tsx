import { format, addDays, subDays, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

interface Booking {
  id: string
  starts_at: string
  status: string
  clients: { name: string } | null
  services: { name: string } | null
}

interface CalendarioDiaProps {
  bookings: Booking[]
  date: Date
  onChangeDate: (date: Date) => void
}

export function CalendarioDia({ bookings, date, onChangeDate }: CalendarioDiaProps) {
  const dayBookings = bookings
    .filter(b => isSameDay(new Date(b.starts_at), date))
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={format(date, 'yyyy-MM-dd')}
            onChange={(e) => onChangeDate(new Date(e.target.value + 'T12:00:00'))}
            className="px-3 py-1.5 bg-blanco border border-crema-oscuro rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
          />
          <span className="text-sm text-texto-muted capitalize">
            {format(date, "EEEE, d 'de' MMMM", { locale: es })}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <button onClick={() => onChangeDate(subDays(date, 1))} className="px-3 py-1.5 hover:bg-crema rounded border border-crema-oscuro">Anterior</button>
          <button onClick={() => onChangeDate(new Date())} className="px-3 py-1.5 bg-crema hover:bg-crema-oscuro rounded border border-crema-oscuro">Hoy</button>
          <button onClick={() => onChangeDate(addDays(date, 1))} className="px-3 py-1.5 hover:bg-crema rounded border border-crema-oscuro">Siguiente</button>
        </div>
      </div>

      <div className="border border-crema-oscuro rounded-lg divide-y divide-crema-oscuro">
        {dayBookings.length === 0 ? (
          <div className="p-8 text-center text-texto-muted text-sm">Sin citas para este día</div>
        ) : (
          dayBookings.map(b => (
            <Link key={b.id} href={`/admin/reservas/${b.id}`}>
              <div className="flex p-4 hover:bg-crema/20 transition-colors cursor-pointer">
                <div className="w-24 text-texto-muted font-medium">
                  {format(new Date(b.starts_at), 'HH:mm')}
                </div>
                <div className={`flex-1 border-l-4 p-3 rounded text-sm ${b.status === 'confirmed' ? 'bg-verde-claro/10 border-verde' : b.status === 'pending' ? 'bg-dorado-claro/20 border-dorado' : 'bg-crema/30 border-crema-oscuro'}`}>
                  <div className="font-medium text-texto">{b.clients?.name}</div>
                  <div className="text-texto-muted">{b.services?.name}</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
