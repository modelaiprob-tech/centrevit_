import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function DashboardTopbar({ user }: { user: any }) {
  const today = new Date()
  const formattedDate = format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  
  // Capitalize first letter
  const finalDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

  return (
    <header className="h-14 bg-blanco border-b border-crema-oscuro flex items-center justify-between px-6 shrink-0">
      <div className="text-sm font-sans text-texto-muted">
        {finalDate}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-sans font-medium text-texto">
          {user?.email || 'Usuario'}
        </span>
        <span className="bg-verde-claro/20 text-verde px-2 py-0.5 rounded text-xs font-sans font-medium">
          Admin
        </span>
      </div>
    </header>
  )
}
