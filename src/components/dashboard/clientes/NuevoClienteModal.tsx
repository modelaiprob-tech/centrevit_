'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { crearCliente } from '@/app/(dashboard)/admin/clientes/actions'

export function NuevoClienteModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md font-sans text-sm transition-colors">
          Nuevo cliente
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blanco rounded-lg shadow-xl z-50 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="font-sans font-medium text-lg text-texto mb-1">Nuevo cliente</Dialog.Title>
          <Dialog.Description className="font-sans text-sm text-texto-muted mb-5">
            Rellena los datos del cliente. Serás redirigido a su ficha.
          </Dialog.Description>

          <form action={crearCliente} className="space-y-4 font-sans text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-texto-muted mb-1">Nombre completo *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                  placeholder="María García"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-texto-muted mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                  placeholder="maria@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-texto-muted mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                  placeholder="600 000 000"
                />
              </div>
              <div>
                <label className="block text-texto-muted mb-1">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="birth_date"
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-texto-muted mb-1">Cómo llegó al centro</label>
                <input
                  type="text"
                  name="source"
                  className="w-full p-2.5 bg-crema/30 border border-crema-oscuro rounded-md focus:outline-none focus:border-verde focus:ring-1 focus:ring-verde/20"
                  placeholder="Instagram, recomendación, web..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="px-4 py-2 border border-crema-oscuro rounded-md text-texto-muted hover:bg-crema transition-colors">
                  Cancelar
                </button>
              </Dialog.Close>
              <button type="submit" className="bg-verde hover:bg-verde-medio text-blanco px-4 py-2 rounded-md transition-colors">
                Crear cliente
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
