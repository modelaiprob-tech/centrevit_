'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function reject() {
    localStorage.setItem('cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6">
      <div
        className="max-w-4xl mx-auto rounded-xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ background: '#1C3A1E', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
      >
        {/* Icono galleta */}
        <svg className="shrink-0 w-8 h-8 text-dorado" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" opacity=".3"/>
          <circle cx="8.5" cy="9" r="1.5"/>
          <circle cx="14.5" cy="7" r="1"/>
          <circle cx="15" cy="13" r="1.5"/>
          <circle cx="9" cy="14.5" r="1"/>
          <circle cx="12" cy="11" r="1"/>
        </svg>
        <p className="text-blanco/80 text-sm font-light leading-relaxed flex-1">
          Usamos cookies para mejorar tu experiencia en el sitio.{' '}
          <Link href="/politica-cookies" className="text-dorado hover:text-dorado-claro underline underline-offset-2 transition-colors">
            Política de cookies
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={reject}
            className="text-blanco/60 hover:text-blanco text-sm font-light transition-colors px-4 py-2"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="bg-dorado hover:bg-dorado-claro text-blanco text-sm font-medium px-5 py-2 rounded-sm transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
