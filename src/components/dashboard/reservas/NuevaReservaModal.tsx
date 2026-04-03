'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface Servicio {
  id: string
  name: string
  duration: number
  price: number | null
}

interface NuevaReservaModalProps {
  servicios: Servicio[]
}

export function NuevaReservaModal({ servicios }: NuevaReservaModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const raw = new FormData(form)

    const startsAtLocal = raw.get('starts_at') as string
    const startsAt = startsAtLocal ? new Date(startsAtLocal).toISOString() : ''

    const body = {
      client_name:  raw.get('client_name') as string,
      client_email: raw.get('client_email') as string,
      client_phone: (raw.get('client_phone') as string) || undefined,
      service_id:   raw.get('service_id') as string,
      starts_at:    startsAt,
      notes:        (raw.get('notes') as string) || undefined,
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.ok) {
          setOpen(false)
          router.refresh()
        } else {
          const data = await res.json()
          setError(data.error || 'Error al crear la reserva.')
        }
      } catch {
        setError('Error de conexión. Inténtalo de nuevo.')
      }
    })
  }

  // Default datetime: next hour
  const nextHour = new Date()
  nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0)
  const defaultDatetime = nextHour.toISOString().slice(0, 16)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
          Nueva reserva
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blanco rounded-lg shadow-xl z-50 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="font-sans font-medium text-lg text-texto mb-1">Nueva reserva</Dialog.Title>
          <Dialog.Description className="font-sans text-sm text-texto-muted mb-5">
            Si el cliente ya existe se reutilizará su ficha por email.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            <div>
              <label className="block text-texto-muted mb-1">Servicio *</label>
              <select
                name="service_id"
                required
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              >
                <option value="">Seleccionar servicio...</option>
                {servicios.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.duration} min{s.price ? ` · ${Number(s.price).toFixed(2)}€` : ''})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-texto-muted mb-1">Fecha y hora *</label>
              <input
                type="datetime-local"
                name="starts_at"
                required
                defaultValue={defaultDatetime}
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              />
            </div>

            <div className="border-t border-crema-oscuro pt-4">
              <p className="text-xs text-texto-muted uppercase tracking-wider mb-3">Datos del cliente</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-texto-muted mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    name="client_name"
                    required
                    className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                    placeholder="María García"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-texto-muted mb-1">Email *</label>
                    <input
                      type="email"
                      name="client_email"
                      required
                      className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                      placeholder="maria@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-texto-muted mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="client_phone"
                      className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                      placeholder="600 000 000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-texto-muted mb-1">Notas internas</label>
              <textarea
                name="notes"
                rows={2}
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20 resize-none"
                placeholder="Observaciones para el terapeuta..."
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="px-4 py-2 border border-crema-oscuro rounded-md text-texto-muted hover:bg-crema transition-colors">
                  Cancelar
                </button>
              </Dialog.Close>
              <button type="submit" disabled={isPending} className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md transition-colors disabled:opacity-50">
                {isPending ? 'Creando...' : 'Crear reserva'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
