import type { Metadata } from 'next'
import Link from 'next/link'
import { ServicesGrid } from '@/components/marketing/ServicesGrid'
import { MetodoCentrevit } from '@/components/marketing/MetodoCentrevit'

export const metadata: Metadata = {
  title: 'Tratamientos — Centrevit',
  description:
    'Terapias naturales en Tudela: Par Biomagnético, Reflexología Podal, Quiromasaje, Presoterapia Ballancer y Manta FHOS LED. Reserva tu sesión.',
}

export default function TratamientosPage() {
  return (
    <div>

      {/* ── HERO ── */}
      <section
        className="relative flex items-end overflow-hidden bg-verde-oscuro"
        style={{ minHeight: '40vh' }}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 pt-32">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            Terapias naturales para tu bienestar en Tudela
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Nuestros tratamientos
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 1: GRID DE TRATAMIENTOS ── */}
      <ServicesGrid />

      <section className="bg-blanco pb-20 px-6 -mt-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-texto-muted font-light text-base mb-6">
            ¿No sabes cuál es el tuyo? Escríbenos y te orientamos.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-verde hover:bg-verde-oscuro text-blanco font-medium px-8 py-3 rounded-sm transition-colors text-sm tracking-wide"
          >
            Contactar
          </Link>
        </div>
      </section>

      {/* ── SECCIÓN 2: MÉTODO CENTREVIT ── */}
      <MetodoCentrevit />

      {/* ── SECCIÓN 3: CTA ── */}
      <section className="py-24 px-6 bg-verde-oscuro">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-serif font-light text-blanco leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            ¿Por dónde empezamos?
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            Cuéntanos qué sientes y te recomendamos el tratamiento más adecuado para ti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              Reservar cita
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 border border-blanco/30 hover:border-blanco/60 text-blanco font-light px-8 py-4 rounded-sm transition-colors text-sm"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
