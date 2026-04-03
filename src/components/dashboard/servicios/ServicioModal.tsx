'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { crearServicio, editarServicio } from '@/app/(dashboard)/admin/servicios/actions'

interface Servicio {
  id: string
  name: string
  duration: number
  price: number | null
  description: string | null
  followup_days: number | null
}

interface ServicioModalProps {
  servicio?: Servicio
  trigger: React.ReactNode
}

export function ServicioModal({ servicio, trigger }: ServicioModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const isEdit = !!servicio

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        if (isEdit) {
          await editarServicio(servicio.id, formData)
        } else {
          await crearServicio(formData)
        }
        setOpen(false)
        router.refresh()
      } catch (err: any) {
        setError(err?.message || 'Error al guardar. Inténtalo de nuevo.')
      }
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blanco rounded-lg shadow-xl z-50 w-full max-w-md p-6">
          <Dialog.Title className="font-sans font-medium text-lg text-texto mb-1">
            {isEdit ? 'Editar servicio' : 'Nuevo servicio'}
          </Dialog.Title>
          <Dialog.Description className="font-sans text-sm text-texto-muted mb-5">
            {isEdit ? 'Modifica los datos del servicio.' : 'Rellena los datos del nuevo servicio.'}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            <div>
              <label className="block text-texto-muted mb-1">Nombre *</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={servicio?.name ?? ''}
                placeholder="Quiromasaje Integrador"
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-texto-muted mb-1">Duración (min) *</label>
                <input
                  type="number"
                  name="duration"
                  required
                  min="1"
                  max="480"
                  defaultValue={servicio?.duration ?? 60}
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                />
              </div>
              <div>
                <label className="block text-texto-muted mb-1">Precio (€)</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  defaultValue={servicio?.price ?? ''}
                  placeholder="0.00"
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-texto-muted mb-1">Días seguimiento</label>
              <input
                type="number"
                name="followup_days"
                min="1"
                max="365"
                defaultValue={servicio?.followup_days ?? ''}
                placeholder="Ej: 30"
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              />
            </div>

            <div>
              <label className="block text-texto-muted mb-1">Descripción</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={servicio?.description ?? ''}
                placeholder="Descripción del servicio..."
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20 resize-none"
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
                {isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear servicio'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
