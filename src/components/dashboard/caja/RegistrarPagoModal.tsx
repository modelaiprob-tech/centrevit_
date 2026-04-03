'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { registrarPago } from '@/app/(dashboard)/admin/caja/actions'

interface Cliente {
  id: string
  name: string
  email: string
}

interface RegistrarPagoModalProps {
  clientes: Cliente[]
}

export function RegistrarPagoModal({ clientes }: RegistrarPagoModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const paidAtRaw = formData.get('paid_at') as string
    if (paidAtRaw) formData.set('paid_at', new Date(paidAtRaw).toISOString())

    startTransition(async () => {
      try {
        await registrarPago(formData)
        setOpen(false)
        router.refresh()
      } catch (err) {
        setError('Error al registrar el pago. Verifica los datos.')
      }
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
          Registrar pago
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blanco rounded-lg shadow-xl z-50 w-full max-w-md p-6">
          <Dialog.Title className="font-sans font-medium text-lg text-texto mb-1">Registrar pago</Dialog.Title>
          <Dialog.Description className="font-sans text-sm text-texto-muted mb-5">
            Registra un ingreso en la caja.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            <div>
              <label className="block text-texto-muted mb-1">Cliente (opcional)</label>
              <select
                name="client_id"
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              >
                <option value="">Sin cliente asociado</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.name} — {c.email}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-texto-muted mb-1">Importe (€) *</label>
                <input
                  type="number"
                  name="amount"
                  required
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                />
              </div>
              <div>
                <label className="block text-texto-muted mb-1">Método *</label>
                <select
                  name="method"
                  required
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                >
                  <option value="cash">Efectivo</option>
                  <option value="card">Tarjeta</option>
                  <option value="transfer">Transferencia</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-texto-muted mb-1">Fecha y hora</label>
              <input
                type="datetime-local"
                name="paid_at"
                defaultValue={new Date().toISOString().slice(0, 16)}
                className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
              />
            </div>

            <div>
              <label className="block text-texto-muted mb-1">Notas</label>
              <input
                type="text"
                name="notes"
                placeholder="Concepto del pago..."
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
              <button type="submit" disabled={isPending} className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md transition-colors disabled:opacity-50">
                {isPending ? 'Guardando...' : 'Registrar'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
