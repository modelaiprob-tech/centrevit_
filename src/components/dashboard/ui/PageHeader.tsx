import React from 'react'

export function PageHeader({ title, description, action }: { title: string, description?: string, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="font-sans text-3xl text-texto">{title}</h1>
        {description && <p className="font-sans text-texto-muted mt-1 text-sm">{description}</p>}
      </div>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
}
