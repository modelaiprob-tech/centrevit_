import { addDays, format, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'

interface Booking {
  id: string
  starts_at: string
  status: string
  clients: { name: string } | null
  services: { name: string } | null
}

interface CalendarioMesProps {
  bookings: Booking[]
  monthStart: Date
  onChangeMonth: (date: Date) => void
}

export function CalendarioMes({ bookings, monthStart, onChangeMonth }: CalendarioMesProps) {
  const monthStartDay = startOfMonth(monthStart)
  const monthEndDay = endOfMonth(monthStartDay)
  const calendarStart = startOfWeek(monthStartDay, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEndDay, { weekStartsOn: 1 })

  const days = []
  let day = calendarStart
  while (day <= calendarEnd) {
    days.push(day)
    day = addDays(day, 1)
  }

  const today = new Date()

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between font-sans">
        <button onClick={() => onChangeMonth(new Date())} className="px-3 py-1.5 bg-crema hover:bg-crema-oscuro rounded border border-crema-oscuro text-sm">
          Hoy
        </button>
        <div className="flex items-center space-x-4">
          <button onClick={() => onChangeMonth(subMonths(monthStart, 1))} className="p-1 hover:bg-crema rounded">←</button>
          <span className="font-medium capitalize text-texto">
            {format(monthStart, 'MMMM yyyy', { locale: es })}
          </span>
          <button onClick={() => onChangeMonth(addMonths(monthStart, 1))} className="p-1 hover:bg-crema rounded">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-crema-oscuro border border-crema-oscuro rounded-lg overflow-hidden">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(dayName => (
          <div key={dayName} className="bg-crema/50 p-2 text-center text-xs font-sans font-medium text-texto-muted border-b border-crema-oscuro uppercase">
            {dayName}
          </div>
        ))}

        {days.map((d, i) => {
          const isToday = isSameDay(d, today)
          const isCurrentMonth = isSameMonth(d, monthStart)
          const dayBookings = bookings.filter(b => isSameDay(new Date(b.starts_at), d))

          return (
            <div key={i} className={`min-h-[100px] p-1.5 bg-blanco border border-crema-oscuro/50 ${!isCurrentMonth ? 'opacity-50' : ''} ${isToday ? 'ring-2 ring-inset ring-verde' : ''}`}>
              <div className={`text-right font-sans text-xs mb-1 ${isToday ? 'font-bold rounded-full w-5 h-5 flex flex-col items-center justify-center float-right bg-verde text-blanco' : 'text-texto-muted'}`}>
                {format(d, 'd')}
              </div>
              <div className="clear-both space-y-1">
                {dayBookings.slice(0, 3).map(b => (
                  <div key={b.id} className="bg-blanco border border-crema-oscuro border-l-2 border-l-dorado shadow-sm px-1 py-0.5 rounded text-[10px] text-texto truncate">
                    {format(new Date(b.starts_at), 'HH:mm')} {b.clients?.name}
                  </div>
                ))}
                {dayBookings.length > 3 && (
                  <div className="text-[10px] text-texto-muted px-1">+{dayBookings.length - 3} más</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
