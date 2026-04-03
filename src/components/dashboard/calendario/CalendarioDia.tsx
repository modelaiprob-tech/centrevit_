import { format, addDays, subDays } from 'date-fns'
import { es } from 'date-fns/locale'

interface CalendarioDiaProps {
  bookings: any[]
  date: Date
  onChangeDate: (date: Date) => void
}

export function CalendarioDia({ bookings, date, onChangeDate }: CalendarioDiaProps) {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input 
            type="date" 
            value={format(date, 'yyyy-MM-dd')}
            onChange={(e) => onChangeDate(new Date(e.target.value))}
            className="px-3 py-1.5 bg-blanco border border-crema-oscuro rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
          />
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <button onClick={() => onChangeDate(subDays(date, 1))} className="px-3 py-1.5 hover:bg-crema rounded border border-crema-oscuro">Anterior</button>
          <button onClick={() => onChangeDate(new Date())} className="px-3 py-1.5 bg-crema hover:bg-crema-oscuro rounded border border-crema-oscuro">Hoy</button>
          <button onClick={() => onChangeDate(addDays(date, 1))} className="px-3 py-1.5 hover:bg-crema rounded border border-crema-oscuro">Siguiente</button>
        </div>
      </div>

      <div className="border border-crema-oscuro rounded-lg divide-y divide-crema-oscuro">
        {/* Mock for shell */}
        <div className="flex p-4 hover:bg-crema/20">
          <div className="w-24 text-texto-muted font-medium">09:00</div>
          <div className="flex-1 bg-verde-claro/10 border-l-4 border-verde p-3 rounded text-sm">
            <div className="font-medium text-texto">Carlos Sánchez</div>
            <div className="text-texto-muted">Par Biomagnético</div>
          </div>
        </div>
        <div className="flex p-4 hover:bg-crema/20">
          <div className="w-24 text-texto-muted font-medium">10:00</div>
          <div className="flex-1 text-sm text-texto-muted italic py-3">
            Sin citas
          </div>
        </div>
      </div>
    </div>
  )
}
