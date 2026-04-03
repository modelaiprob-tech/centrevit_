import type { Metadata } from 'next'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ReservaForm } from '@/components/marketing/ReservaForm'
import pool from '@/lib/db'

export const metadata: Metadata = {
  title: 'Reservar sesión — Centrevit',
  description:
    'Reserva tu sesión en Centrevit, Tudela. Rellena el formulario y te confirmamos en menos de 24h.',
}

export const dynamic = 'force-dynamic'

const PASOS_RESERVA = [
  { num: '01', title: 'Rellena el formulario', desc: 'Cuéntanos qué síntomas quieres tratar y elige tu tratamiento.' },
  { num: '02', title: 'Te confirmamos en 24h', desc: 'Nos ponemos en contacto contigo para fijar día y hora.' },
  { num: '03', title: 'Descubre lo que tu cuerpo necesita', desc: 'Cada sesión se adapta a tu estado real.' },
]

async function getServicios() {
  const { rows } = await pool.query<{ id: string; name: string; duration: number }>(
    `SELECT id, name, duration FROM services WHERE active = true ORDER BY name`
  )
  return rows
}

export default async function ReservarPage() {
  const servicios = await getServicios()

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
            Te respondemos en menos de 24h
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Reserva tu sesión
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 1: FORMULARIO ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* 3 pasos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-14 relative">
            <div className="hidden sm:block absolute top-5 left-[16.66%] right-[16.66%] h-px bg-dorado/30" />
            {PASOS_RESERVA.map((paso, i) => (
              <div key={paso.num} className="relative flex flex-col items-center text-center px-4">
                <div className="relative z-10 w-10 h-10 rounded-full bg-verde-oscuro flex items-center justify-center mb-3">
                  <span className="font-serif text-dorado text-sm font-light">{i + 1}</span>
                </div>
                <h3 className="font-serif text-texto text-base font-light mb-1">{paso.title}</h3>
                <p className="text-texto-muted text-xs font-light leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <SectionTitle
              tag="Reserva"
              title="Tu sesión en"
              titleEm="Centrevit."
            />
            <ReservaForm servicios={servicios} />
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: CONTACTO DIRECTO ── */}
      <section className="bg-blanco py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <SectionTitle
            tag="Contacto directo"
            title="¿Prefieres"
            titleEm="llamarnos?"
            centered
          />

          <a
            href="tel:679417138"
            className="block font-serif font-light text-verde-oscuro leading-none mb-2 hover:text-verde transition-colors"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            679 41 71 38
          </a>

          <a
            href="https://wa.me/34679417138"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-texto-muted text-sm font-light hover:text-verde transition-colors mb-8"
          >
            También por WhatsApp →
          </a>

          <div className="h-px bg-crema-oscuro mb-8" />

          <div className="text-texto-muted text-sm font-light leading-relaxed">
            <p className="font-medium text-texto mb-1">Horario de atención</p>
            <p>Lunes a Viernes · 9:00–14:00 y 16:00–20:00</p>
          </div>
        </div>
      </section>

    </div>
  )
}
