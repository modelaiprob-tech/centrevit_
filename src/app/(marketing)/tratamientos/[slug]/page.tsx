import { SERVICIOS } from '@/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const servicio = SERVICIOS.find((s) => s.slug === slug)
  if (!servicio) return {}
  return {
    title: `${servicio.nombre} en Tudela`,
    description: `${servicio.descripcion} Reserva tu sesión en Centrevit, Tudela.`,
  }
}

export default async function TratamientoPage({ params }: Props) {
  const { slug } = await params
  const servicio = SERVICIOS.find((s) => s.slug === slug)
  if (!servicio) notFound()

  const imagenServicio = `/images/services/${servicio.slug}.webp`
  const tieneContenidoRico = !!(servicio.sesionPasos || servicio.beneficiosDetalle || servicio.paraQuienItems)

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '50vh' }}>
        <Image
          src={imagenServicio}
          alt={servicio.nombre}
          fill
          unoptimized={true}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-verde-oscuro/55" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 pt-40">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            {servicio.subtitulo}
          </div>
          <h1 className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            {servicio.nombre}
            
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 items-start">
          <div>
            <SectionTitle
              tag="Sobre el tratamiento"
              title={servicio.nombre}
            />
            <p className="text-texto-muted font-light leading-relaxed text-base">
              {servicio.introTexto ?? servicio.descripcion}
            </p>
          </div>
          {/* Card duración */}
          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-3">Duración de la sesión</div>
            <div className="font-serif text-6xl font-light text-verde-oscuro leading-none mb-1">
              {servicio.duracion}
            </div>
            <div className="text-texto-muted text-sm font-light">minutos</div>
            <div className="h-px bg-crema-oscuro my-6" />
            <Link
              href="/reservar"
              className="block text-center bg-verde text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-verde-oscuro transition-colors"
            >
              Reservar sesión
            </Link>
          </div>
        </div>
      </section>

      {/* ── CÓMO ES UNA SESIÓN ── solo si hay pasos definidos */}
      {servicio.sesionPasos && (
        <section className="bg-blanco py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              tag="El proceso"
              title="¿Cómo es"
              titleEm="una sesión?"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 relative">
              <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-dorado/30" />
              {servicio.sesionPasos.map((paso, i) => (
                <div key={paso.num} className="relative flex flex-col items-center text-center px-8">
                  <div className="absolute -top-4 text-8xl font-serif font-light text-dorado/6 select-none pointer-events-none">
                    {paso.num}
                  </div>
                  <div className="relative z-10 w-16 h-16 rounded-full border border-dorado/40 bg-crema flex items-center justify-center mb-6">
                    <span className="font-serif text-dorado text-lg font-light">{i + 1}</span>
                  </div>
                  <h3 className="font-serif text-texto text-xl font-light mb-3">{paso.title}</h3>
                  <p className="text-texto-muted text-sm font-light leading-relaxed">{paso.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PARA QUIÉN ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            tag="Indicaciones"
            title="¿Para"
            titleEm="quién?"
          />
          {servicio.paraQuienItems ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicio.paraQuienItems.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-blanco rounded-lg p-5 border border-crema-oscuro">
                  <span className="text-verde shrink-0 mt-0.5 text-lg leading-none">✓</span>
                  <span className="text-texto text-sm font-light leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-texto-muted font-light leading-relaxed">{servicio.paraQuien}</p>
          )}
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="bg-blanco py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            tag="Qué conseguirás"
            title="Beneficios del"
            titleEm="tratamiento."
          />
          {servicio.beneficiosDetalle ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {servicio.beneficiosDetalle.map((b) => (
                <div key={b.titulo} className="group p-6 bg-crema rounded-lg border border-transparent hover:border-verde-claro hover:-translate-y-1 transition-all duration-200">
                  <div className="text-dorado text-2xl mb-4">{b.icono}</div>
                  <h3 className="font-serif font-light text-xl text-texto mb-2">{b.titulo}</h3>
                  <p className="text-texto-muted text-sm font-light leading-relaxed">{b.descripcion}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {servicio.beneficios.map((b) => (
                <div key={b} className="flex items-start gap-3 p-4 bg-crema rounded">
                  <span className="text-dorado shrink-0 mt-0.5">✓</span>
                  <span className="text-texto text-sm font-light">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-verde py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-6">
            <span className="h-px w-7 bg-dorado" />
            Reserva tu sesión
            <span className="h-px w-7 bg-dorado" />
          </div>
          <h2 className="font-serif font-light text-blanco text-4xl md:text-5xl leading-tight mb-4">
            ¿Quieres probar la<br />
            <em className="italic text-dorado-claro">{servicio.nombre}?</em>
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            Reserva tu primera sesión en Centrevit. Te respondemos en menos de 24h.
          </p>
          <Link
            href="/reservar"
            className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-10 py-4 rounded-sm transition-colors text-sm tracking-wide"
          >
            Reservar {servicio.nombre} →
          </Link>

          {/* 3 pasos de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-blanco/10">
            {[
              { num: '01', title: 'Contacta', desc: 'Por WhatsApp, email o formulario web.' },
              { num: '02', title: 'Reserva tu cita', desc: 'Fijamos día y hora juntos.' },
              { num: '03', title: 'Primera sesión', desc: 'Adaptada a tu estado corporal.' },
            ].map((paso) => (
              <div key={paso.num} className="text-center">
                <div className="font-serif text-dorado/50 text-3xl font-light mb-2">{paso.num}</div>
                <h4 className="font-serif text-blanco text-lg font-light mb-1">{paso.title}</h4>
                <p className="text-blanco/60 text-sm font-light">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
