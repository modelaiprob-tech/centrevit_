// Primitiva de animación
function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-crema-oscuro/60 rounded ${className}`} />
}

// ─── Reutilizables ───────────────────────────────────────────────────────────

export function StatCardSkeleton() {
  return (
    <div className="bg-blanco border border-crema-oscuro rounded-lg p-5">
      <Pulse className="h-3 w-24 mb-3" />
      <Pulse className="h-9 w-16" />
    </div>
  )
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-crema-oscuro">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Pulse className="h-4 w-full max-w-[140px]" />
        </td>
      ))}
    </tr>
  )
}

export function TableSkeleton({ cols = 5, rows = 5 }: { cols?: number; rows?: number }) {
  return (
    <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-crema/50 border-b border-crema-oscuro">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <Pulse className="h-3 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} cols={cols} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PageHeaderSkeleton({ hasAction = false }: { hasAction?: boolean }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Pulse className="h-8 w-48" />
      {hasAction && <Pulse className="h-9 w-32 rounded-md" />}
    </div>
  )
}

// ─── Por página ───────────────────────────────────────────────────────────────

export function DashboardHomeSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Pulse className="h-6 w-36 mb-4" />
          <TableSkeleton cols={5} rows={4} />
        </div>
        <div>
          <Pulse className="h-6 w-44 mb-4" />
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-4 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2 pb-4 border-b border-crema-oscuro last:border-0">
                <Pulse className="h-4 w-32" />
                <Pulse className="h-3 w-24" />
                <Pulse className="h-8 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReservasPageSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeaderSkeleton hasAction />
      <div className="flex gap-4">
        <Pulse className="h-9 w-80 rounded-lg" />
        <Pulse className="h-9 w-36 rounded-lg" />
      </div>
      <TableSkeleton cols={6} rows={6} />
    </div>
  )
}

export function ClientesPageSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeaderSkeleton hasAction />
      <Pulse className="h-10 w-96 rounded-lg" />
      <TableSkeleton cols={6} rows={7} />
    </div>
  )
}

export function CajaPageSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeaderSkeleton hasAction />
      <Pulse className="h-9 w-36 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <TableSkeleton cols={5} rows={6} />
    </div>
  )
}

export function EstadisticasPageSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeaderSkeleton hasAction />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
        <Pulse className="h-5 w-24 mb-6" />
        <Pulse className="h-48 w-full rounded" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <Pulse className="h-5 w-40 mb-6" />
          <Pulse className="h-40 w-full rounded" />
        </div>
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
          <Pulse className="h-5 w-28 mb-4" />
          <TableSkeleton cols={3} rows={5} />
        </div>
      </div>
    </div>
  )
}

export function ServiciosPageSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeaderSkeleton hasAction />
      <TableSkeleton cols={6} rows={5} />
    </div>
  )
}

export function CalendarioPageSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeaderSkeleton hasAction />
      <div className="bg-blanco border border-crema-oscuro rounded-lg p-4">
        <Pulse className="h-[520px] w-full rounded" />
      </div>
    </div>
  )
}

export function DetalleReservaSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <Pulse className="h-4 w-32 mb-2" />
      <PageHeaderSkeleton hasAction />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-4">
            <Pulse className="h-5 w-48 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Pulse className="h-3 w-20" />
                  <Pulse className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
            <Pulse className="h-5 w-32 mb-4" />
            <Pulse className="h-24 w-full rounded-md" />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-verde-oscuro rounded-lg p-6 space-y-4">
            <Pulse className="h-5 w-36 mb-2 bg-blanco/20" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Pulse className="h-3 w-16 bg-blanco/20" />
                <Pulse className="h-4 w-28 bg-blanco/20" />
              </div>
            ))}
          </div>
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-3">
            <Pulse className="h-5 w-24 mb-2" />
            <Pulse className="h-10 w-full rounded-md" />
            <Pulse className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DetalleclienteSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <Pulse className="h-4 w-32 mb-2" />
      <PageHeaderSkeleton />
      <div className="flex gap-1 border-b border-crema-oscuro mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Pulse key={i} className="h-9 w-32 rounded-t-md" />
        ))}
      </div>
      <div className="bg-blanco border border-crema-oscuro rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Pulse className="h-3 w-20" />
              <Pulse className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SettingsPageSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <PageHeaderSkeleton />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-4">
          <Pulse className="h-5 w-40 mb-4" />
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="space-y-1">
                <Pulse className="h-3 w-20" />
                <Pulse className="h-9 w-full rounded-md" />
              </div>
            ))}
          </div>
          <Pulse className="h-9 w-28 rounded-md" />
        </div>
      ))}
    </div>
  )
}
