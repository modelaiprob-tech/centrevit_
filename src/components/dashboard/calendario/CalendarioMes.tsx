import { addDays, format, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'

interface CalendarioMesProps {
  bookings: any[]
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
          return (
            <div key={i} className={`min-h-[100px] p-1.5 bg-blanco border border-crema-oscuro/50 ${!isCurrentMonth ? 'opacity-50' : ''} ${isToday ? 'bg-verde-claro/5' : ''}`}>
              <div className={`text-right font-sans text-xs mb-1 ${isToday ? 'text-verde font-bold rounded-full w-5 h-5 flex flex-col items-center justify-center float-right bg-verde-claro/20' : 'text-texto-muted'}`}>
                {format(d, 'd')}
              </div>
              <div className="clear-both space-y-1">
                {/* Bookings mapping shell */}
                {isCurrentMonth && d.getDate() === 15 && (
                  <div className="bg-dorado-claro/50 border-l-2 border-dorado px-1 py-0.5 rounded text-[10px] text-texto truncate">
                    1 cita
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
