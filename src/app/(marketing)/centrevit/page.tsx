import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { MetodoCentrevit } from '@/components/marketing/MetodoCentrevit'

export const metadata: Metadata = {
  title: 'Centrevit — Quiénes somos',
  description:
    'Centro de terapias naturales en Tudela especializado en el equilibrio del cuerpo, la mente y la energía. Conoce el Método Centrevit.',
}

const COMPROMISOS = [
  'Alivio de molestias crónicas',
  'Recuperación deportiva y muscular',
  'Prevención y mantenimiento del bienestar',
]

export default function CentrevitPage() {
  return (
    <div>

      {/* ── HERO ── */}
      <section
        className="relative flex items-end overflow-hidden bg-verde-oscuro"
        style={{ minHeight: '50vh' }}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 pt-40">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            Bienestar integral en Tudela, Navarra
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Centrevit
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 1: QUIÉNES SOMOS ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

          <div>
            <SectionTitle
              tag="Quiénes somos"
              title="No trabajamos tratamientos aislados."
              titleEm="Trabajamos personas."
            />
            <p className="text-texto-muted font-light leading-relaxed text-base">
              CENTREVIT es un centro de terapias naturales en Tudela especializado en el equilibrio
              del cuerpo, la mente y la energía. Nuestro enfoque se basa en el Método CENTREVIT,
              un sistema propio que combina distintas terapias en un circuito completo diseñado para
              mejorar tu bienestar de forma global y duradera.
            </p>
          </div>

          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <ul className="space-y-5 mb-6">
              {[
                { label: 'Ubicación', value: 'Tudela, Navarra' },
                { label: 'Teléfono', value: '679 41 71 38' },
                { label: 'Email', value: 'javierxy@hotmail.com' },
              ].map(({ label, value }) => (
                <li key={label}>
                  <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-0.5">
                    {label}
                  </div>
                  <div className="text-texto font-light text-sm">{value}</div>
                </li>
              ))}
            </ul>
            <div className="h-px bg-crema-oscuro mb-6" />
            <Link
              href="/reservar"
              className="block text-center bg-verde text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-verde-oscuro transition-colors"
            >
              Reservar cita
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: COMPROMISO ── */}
      <section className="bg-blanco py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <SectionTitle
              tag="Nuestro enfoque"
              title="Nuestro compromiso"
              titleEm="contigo."
            />
            <div className="space-y-4">
              {COMPROMISOS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-crema rounded-lg p-5 border border-crema-oscuro"
                >
                  <span className="text-verde shrink-0 mt-0.5 text-lg leading-none">✓</span>
                  <span className="text-texto text-sm font-light leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <Image
              src="/images/Javier.webp"
              alt="Javier — Terapeuta en Centrevit Tudela"
              fill
              unoptimized={true}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: EL MÉTODO ── */}
      <MetodoCentrevit />

      {/* ── SECCIÓN 4: CTA ── */}
      <section className="py-24 px-6 bg-verde-oscuro">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-serif font-light text-blanco leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            ¿Quieres conocernos?
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            Primera sesión adaptada completamente a ti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              Reservar cita
            </Link>
            <Link
              href="/tratamientos"
              className="inline-flex items-center gap-2 border border-blanco/30 hover:border-blanco/60 text-blanco font-light px-8 py-4 rounded-sm transition-colors text-sm"
            >
              Ver tratamientos
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
