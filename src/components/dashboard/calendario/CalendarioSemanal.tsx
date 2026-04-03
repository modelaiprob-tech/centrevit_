import { addDays, format, subWeeks, addWeeks, startOfWeek, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'

interface CalendarioSemanalProps {
  bookings: any[]
  weekStart: Date
  onChangeWeek: (date: Date) => void
}

export function CalendarioSemanal({ bookings, weekStart, onChangeWeek }: CalendarioSemanalProps) {
  const start = startOfWeek(weekStart, { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i))
  const today = new Date()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between font-sans">
        <button onClick={() => onChangeWeek(new Date())} className="px-3 py-1.5 bg-crema hover:bg-crema-oscuro rounded border border-crema-oscuro text-sm">
          Hoy
        </button>
        <div className="flex items-center space-x-4">
          <button onClick={() => onChangeWeek(subWeeks(start, 1))} className="p-1 hover:bg-crema rounded">←</button>
          <span className="font-medium capitalize text-texto">
            {format(start, 'MMMM yyyy', { locale: es })}
          </span>
          <button onClick={() => onChangeWeek(addWeeks(start, 1))} className="p-1 hover:bg-crema rounded">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-crema-oscuro border border-crema-oscuro rounded-lg overflow-hidden">
        {days.map((day, i) => {
          const isToday = isSameDay(day, today)
          return (
            <div key={i} className={`bg-blanco min-h-[400px] ${isToday ? 'bg-verde-claro/5' : ''}`}>
              <div className={`p-2 text-center text-sm font-sans border-b border-crema-oscuro ${isToday ? 'text-verde font-medium' : 'text-texto-muted'}`}>
                <span className="block text-xs uppercase">{format(day, 'EEE', { locale: es })}</span>
                <span className="block text-lg">{format(day, 'd')}</span>
              </div>
              <div className="p-1.5 space-y-1.5">
                {/* Bookings mapped here */}
                {i === 1 && (
                  <div className="bg-dorado-claro/50 border-l-2 border-dorado p-1.5 rounded text-xs font-sans">
                    <div className="font-medium">10:30</div>
                    <div className="truncate">María García</div>
                    <div className="text-texto-muted truncate">Reflexología</div>
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
