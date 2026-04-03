export type Status = 'pending' | 'confirmed' | 'done' | 'cancelled'

const labels: Record<Status, string> = {
  pending:   'Pendiente',
  confirmed: 'Confirmada',
  done:      'Realizada',
  cancelled: 'Cancelada',
}

const styles: Record<Status, string> = {
  pending:   'bg-dorado-claro text-dorado',
  confirmed: 'bg-verde-claro/20 text-verde',
  done:      'bg-crema-oscuro text-texto-muted',
  cancelled: 'bg-red-50 text-red-600',
}

export function StatusBadge({ status }: { status: Status }) {
  // Fallback para status inválidos
  const safeStatus = status in labels ? status : 'pending'
  
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-sans font-medium whitespace-nowrap ${styles[safeStatus]}`}>
      {labels[safeStatus]}
    </span>
  )
}
