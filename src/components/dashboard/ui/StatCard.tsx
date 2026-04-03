interface StatCardProps {
  label: string
  value: number | string
  alert?: boolean
  sublabel?: string
}

export function StatCard({ label, value, alert, sublabel }: StatCardProps) {
  return (
    <div className="bg-blanco border border-crema-oscuro rounded-lg p-5">
      <div className="text-xs font-sans text-texto-muted uppercase tracking-wide mb-2">
        {label}
      </div>
      <div className={`text-4xl font-sans font-light ${alert && Number(value) > 0 ? 'text-dorado' : 'text-texto'}`}>
        {value}
      </div>
      {sublabel && (
        <div className="text-xs text-texto-muted mt-1 font-sans">
          {sublabel}
        </div>
      )}
    </div>
  )
}
