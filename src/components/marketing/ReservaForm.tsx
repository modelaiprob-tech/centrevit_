'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'

type Servicio = { id: string; name: string; duration: number }

export function ReservaForm({ servicios }: { servicios: Servicio[] }) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get('privacidad')) {
      setError('Debes aceptar la política de privacidad para continuar.')
      return
    }

    const rawDatetime = data.get('starts_at') as string
    if (!rawDatetime) {
      setError('La fecha y hora son obligatorias.')
      return
    }

    const body = {
      client_name:  (data.get('client_name') as string).trim(),
      client_email: (data.get('client_email') as string).trim(),
      client_phone: (data.get('client_phone') as string).trim() || undefined,
      service_id:   data.get('service_id') as string,
      starts_at:    new Date(rawDatetime).toISOString(),
      notes:        (data.get('notes') as string).trim() || undefined,
    }

    setError(null)
    setFieldErrors({})

    startTransition(async () => {
      try {
        const res = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const json = await res.json()
        if (!res.ok) {
          if (json.details) setFieldErrors(json.details)
          setError(json.error ?? 'Error al enviar la solicitud. Inténtalo de nuevo.')
          return
        }
        setSuccess(true)
      } catch {
        setError('Error de conexión. Revisa tu internet e inténtalo de nuevo.')
      }
    })
  }

  if (success) {
    return (
      <div className="bg-blanco rounded-xl p-10 border border-crema-oscuro shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-verde/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-verde" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-serif font-light text-2xl text-texto mb-2">Solicitud enviada</h2>
        <p className="text-texto-muted text-sm font-light leading-relaxed">
          Hemos recibido tu solicitud. Te confirmamos la cita en menos de 24h.
        </p>
      </div>
    )
  }

  const inputClass = (field: string) =>
    `w-full border rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors ${
      fieldErrors[field] ? 'border-red-400' : 'border-crema-oscuro'
    }`

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDatetime = tomorrow.toISOString().slice(0, 16)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
            Nombre completo <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="client_name"
            placeholder="Tu nombre"
            required
            className={inputClass('client_name')}
          />
          {fieldErrors.client_name && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.client_name[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="client_email"
            placeholder="tu@email.com"
            required
            className={inputClass('client_email')}
          />
          {fieldErrors.client_email && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.client_email[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
          Teléfono
        </label>
        <input
          type="tel"
          name="client_phone"
          placeholder="También por WhatsApp"
          className={inputClass('client_phone')}
        />
        {fieldErrors.client_phone && (
          <p className="text-red-400 text-xs mt-1">{fieldErrors.client_phone[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
          Tratamiento <span className="text-red-400">*</span>
        </label>
        <select
          name="service_id"
          required
          defaultValue=""
          className={inputClass('service_id')}
        >
          <option value="" disabled>Selecciona un tratamiento</option>
          {servicios.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {fieldErrors.service_id && (
          <p className="text-red-400 text-xs mt-1">{fieldErrors.service_id[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
          Fecha y hora preferida <span className="text-red-400">*</span>
        </label>
        <input
          type="datetime-local"
          name="starts_at"
          min={minDatetime}
          required
          className={inputClass('starts_at')}
        />
        <p className="text-xs text-texto-muted mt-1">Horario disponible: Lun–Vie 9:00–14:00 y 16:00–20:00</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
          Comentarios <span className="text-texto-muted font-normal">(opcional)</span>
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Cuéntanos qué síntomas quieres tratar..."
          className={`${inputClass('notes')} resize-none`}
        />
      </div>

      {/* Política de privacidad */}
      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          id="privacidad"
          name="privacidad"
          className="mt-0.5 w-4 h-4 shrink-0 accent-verde cursor-pointer"
        />
        <label htmlFor="privacidad" className="text-xs text-texto-muted font-light leading-relaxed cursor-pointer">
          He leído y acepto la{' '}
          <Link href="/politica-privacidad" className="text-verde hover:underline" target="_blank">
            política de privacidad
          </Link>
          . Autorizo el tratamiento de mis datos para gestionar mi solicitud.
          <span className="text-red-400 ml-0.5">*</span>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-verde-oscuro hover:bg-verde disabled:opacity-60 disabled:cursor-not-allowed text-blanco font-medium text-sm py-3.5 rounded-sm transition-colors duration-200 tracking-wide"
      >
        {isPending ? 'Enviando...' : 'Enviar solicitud'}
      </button>

      <p className="text-center text-xs text-texto-muted">
        Sin compromiso. Te respondemos en menos de 24h.
      </p>
    </form>
  )
}
