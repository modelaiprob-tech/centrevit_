'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { reprogramarReserva } from '@/app/(dashboard)/admin/reservas/actions'

interface EditarReservaModalProps {
  bookingId: string
  currentStartsAt: string
}

export function EditarReservaModal({ bookingId, currentStartsAt }: EditarReservaModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const defaultValue = new Date(currentStartsAt).toISOString().slice(0, 16)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const startsAtRaw = formData.get('starts_at') as string
    if (startsAtRaw) formData.set('starts_at', new Date(startsAtRaw).toISOString())

    startTransition(async () => {
      try {
        await reprogramarReserva(bookingId, formData)
        setOpen(false)
        router.refresh()
      } catch (err: any) {
        setError(err?.message || 'Error al reprogramar. Inténtalo de nuevo.')
      }
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 border border-crema-oscuro rounded-md text-sm font-sans text-texto hover:bg-crema transition-colors">
          Editar reserva
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blanco rounded-lg shadow-xl z-50 w-full max-w-sm p-6">
          <Dialog.Title className="font-sans font-medium text-lg text-texto mb-1">Reprogramar cita</Dialog.Title>
          <Dialog.Description className="font-sans text-sm text-texto-muted mb-5">
            Cambia la fecha y hora de esta reserva. Se comprobará disponibilidad.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            <div>
              <label className="block text-texto-muted mb-1">Nueva fecha y hora *</label>
              <input
                type="datetime-local"
                name="starts_at"
                required
                defaultValue={defaultValue}
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="px-4 py-2 border border-crema-oscuro rounded-md text-texto-muted hover:bg-crema transition-colors">
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isPending}
                className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md transition-colors disabled:opacity-50"
              >
                {isPending ? 'Guardando...' : 'Reprogramar'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
