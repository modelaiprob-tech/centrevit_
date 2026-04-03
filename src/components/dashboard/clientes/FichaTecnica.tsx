'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { StatusBadge } from '../ui/StatusBadge'
import { actualizarFichaTecnica } from '@/app/(dashboard)/admin/clientes/actions'
import { marcarSeguimientoRealizado } from '@/app/(dashboard)/admin/reservas/actions'

interface FichaTecnicaProps {
  cliente: any
  bookings: any[]
}

export function FichaTecnica({ cliente, bookings }: FichaTecnicaProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [savedText, setSavedText] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      allergies:     (form.elements.namedItem('allergies')     as HTMLTextAreaElement).value,
      medical_notes: (form.elements.namedItem('medical_notes') as HTMLTextAreaElement).value,
      general_notes: (form.elements.namedItem('general_notes') as HTMLTextAreaElement).value,
    }
    setIsSaving(true)
    try {
      await actualizarFichaTecnica(cliente.id, data)
      setSavedText('Guardado')
      router.refresh()
    } catch {
      setSavedText('Error al guardar')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSavedText(''), 2000)
    }
  }

  const handleMarcarSeguimiento = (bookingId: string) => {
    startTransition(async () => {
      await marcarSeguimientoRealizado(bookingId)
    })
  }

  const seguimientos = bookings.filter(b => b.followup_date !== null)

  return (
    <Tabs.Root defaultValue="datos" className="flex flex-col font-sans">
      <Tabs.List className="flex shrink-0 border-b border-crema-oscuro mb-6 space-x-1">
        {[
          { id: 'datos',        label: 'Datos personales' },
          { id: 'ficha',        label: 'Ficha técnica' },
          { id: 'historial',    label: 'Historial sesiones' },
          { id: 'seguimientos', label: `Seguimientos${seguimientos.length ? ` (${seguimientos.length})` : ''}` },
        ].map(tab => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className="px-5 py-2.5 text-sm text-texto-muted hover:text-texto data-[state=active]:text-verde data-[state=active]:font-medium data-[state=active]:shadow-[inset_0_-2px_0_0_currentColor] bg-transparent outline-none cursor-pointer transition-colors"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="datos" className="outline-none">
        <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-texto-muted block mb-1 text-xs uppercase tracking-wider">Nombre completo</span>
              <span className="font-medium text-texto">{cliente.name}</span>
            </div>
            <div>
              <span className="text-texto-muted block mb-1 text-xs uppercase tracking-wider">Email</span>
              <span className="text-texto">{cliente.email}</span>
            </div>
            <div>
              <span className="text-texto-muted block mb-1 text-xs uppercase tracking-wider">Teléfono</span>
              <span className="text-texto">{cliente.phone || '-'}</span>
            </div>
            <div>
              <span className="text-texto-muted block mb-1 text-xs uppercase tracking-wider">Fecha nacimiento</span>
              <span className="text-texto">{cliente.birth_date ? new Date(cliente.birth_date).toLocaleDateString('es-ES') : '-'}</span>
            </div>
            <div>
              <span className="text-texto-muted block mb-1 text-xs uppercase tracking-wider">Origen</span>
              <span className="text-texto capitalize">{cliente.source || '-'}</span>
            </div>
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="ficha" className="outline-none">
        <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-texto mb-2">Alergias y contraindicaciones</label>
              <textarea
                name="allergies"
                defaultValue={cliente.allergies || ''}
                className="w-full p-3 bg-crema/30 border border-crema-oscuro rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-texto mb-2">Notas médicas relevantes</label>
              <textarea
                name="medical_notes"
                defaultValue={cliente.medical_notes || ''}
                className="w-full p-3 bg-crema/30 border border-crema-oscuro rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-texto mb-2">Notas generales del terapeuta</label>
              <textarea
                name="general_notes"
                defaultValue={cliente.general_notes || ''}
                className="w-full p-3 bg-crema/30 border border-crema-oscuro rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-verde hover:bg-verde-medio text-blanco px-6 py-2 rounded-md font-sans text-sm transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar ficha técnica'}
            </button>
            {savedText && <span className="text-sm text-verde font-medium">{savedText}</span>}
          </div>
        </form>
      </Tabs.Content>

      <Tabs.Content value="historial" className="outline-none">
        <div className="bg-blanco border border-crema-oscuro rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-crema/50 border-b border-crema-oscuro text-texto-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Servicio</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Importe</th>
                <th className="px-4 py-3 font-medium">Notas internas</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-texto-muted">Sin historial de sesiones</td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="border-b border-crema-oscuro last:border-0 hover:bg-crema/20">
                    <td className="px-4 py-3">{new Date(booking.starts_at).toLocaleDateString('es-ES')}</td>
                    <td className="px-4 py-3">{booking.services?.name}</td>
                    <td className="px-4 py-3"><StatusBadge status={booking.status as any} /></td>
                    <td className="px-4 py-3">{booking.price_charged ? `${Number(booking.price_charged).toFixed(2)}€` : '-'}</td>
                    <td className="px-4 py-3 text-texto-muted max-w-[200px] truncate">{booking.internal_notes || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Tabs.Content>

      <Tabs.Content value="seguimientos" className="outline-none">
        {seguimientos.length === 0 ? (
          <div className="bg-blanco border border-crema-oscuro rounded-lg p-8 text-center text-sm text-texto-muted">
            No hay seguimientos pendientes para este cliente
          </div>
        ) : (
          <div className="space-y-3">
            {seguimientos.map((b: any) => (
              <div key={b.id} className={`bg-blanco border rounded-lg p-4 flex items-center justify-between gap-4 ${b.followup_done ? 'border-crema-oscuro opacity-60' : 'border-dorado/40'}`}>
                <div className="flex-1 text-sm font-sans">
                  <p className="font-medium text-texto">{b.services?.name}</p>
                  <p className="text-texto-muted text-xs mt-0.5">
                    Sesión: {new Date(b.starts_at).toLocaleDateString('es-ES')}
                    {b.followup_date && ` · Seguimiento: ${new Date(b.followup_date).toLocaleDateString('es-ES')}`}
                  </p>
                </div>
                <div className="shrink-0">
                  {b.followup_done ? (
                    <span className="text-xs text-verde font-medium px-3 py-1 bg-verde-claro/20 rounded-full">Realizado</span>
                  ) : (
                    <button
                      onClick={() => handleMarcarSeguimiento(b.id)}
                      disabled={isPending}
                      className="text-xs bg-crema hover:bg-crema-oscuro text-texto px-3 py-1.5 rounded-md transition-colors border border-crema-oscuro disabled:opacity-50"
                    >
                      Marcar realizado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Tabs.Content>
    </Tabs.Root>
  )
}
