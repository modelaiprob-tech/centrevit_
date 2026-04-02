'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/tratamientos', label: 'Tratamientos' },
  { href: '/centrevit', label: 'Centrevit' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY
      if (current < 80) {
        setVisible(true)
      } else {
        setVisible(current < lastScrollY.current)
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-1.5 left-0 right-0 z-50 px-4 md:px-8 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>

      {/* Fondo crema flotante — siempre visible */}
      <div
        className="absolute inset-0 mx-4 md:mx-8 rounded-2xl"
        style={{
          background: '#F7F3EA',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-2 md:px-4 py-1 md:py-2 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="shrink-0 -ml-1 md:-ml-3">
          <Image
            src="/logo.png"
            alt="Centrevit"
            width={220}
            height={66}
            className="h-11 md:h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-16">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-sm tracking-wide text-verde-oscuro hover:text-verde transition-colors duration-200 group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-dorado group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
          ))}

          <div className="h-4 w-px bg-verde-oscuro/15" />

          {/* CTA — dorado */}
          <Link
            href="/reservar"
            className="relative overflow-hidden text-sm font-medium px-6 py-2.5 rounded-sm bg-dorado text-white group"
            style={{ boxShadow: '0 2px 12px rgba(201,168,76,0.25)' }}
          >
            <span className="absolute inset-0 bg-dorado-claro translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-verde-oscuro transition-colors duration-300">
              Reservar cita
            </span>
          </Link>
        </nav>

        {/* Mobile — hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2 text-verde-oscuro"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-0.5 bg-current origin-center transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current origin-center transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`relative md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: '#EDE5D4', borderRadius: '0 0 1rem 1rem' }}
      >
        <div className="px-6 py-6 flex flex-col gap-5 border-t border-verde-oscuro/10">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-verde-oscuro text-base font-light tracking-wide hover:text-verde transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="h-px bg-verde-oscuro/10" />
          <Link
            href="/reservar"
            className="bg-dorado text-white text-sm font-medium px-6 py-3 rounded-sm text-center hover:bg-dorado-claro hover:text-verde-oscuro transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Reservar cita
          </Link>
        </div>
      </div>
    </header>
  )
}
