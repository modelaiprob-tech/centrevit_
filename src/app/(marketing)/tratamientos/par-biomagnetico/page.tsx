import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Par Biomagnético en Tudela — Centrevit',
  description:
    'Terapia natural con imanes que corrige desequilibrios del pH corporal, reduce la inflamación y recupera la vitalidad. Sin agujas, sin dolor. Reserva en Centrevit, Tudela.',
}

const FAQS = [
  {
    q: '¿Es seguro el par biomagnético?',
    a: 'Sí. Es una terapia completamente no invasiva que utiliza imanes de uso cotidiano. No produce efectos secundarios y es compatible con cualquier tratamiento médico.',
  },
  {
    q: '¿Cuántas sesiones necesito?',
    a: 'Generalmente entre 1 y 3 sesiones son suficientes para notar resultados. Dependiendo del caso, puede recomendarse un seguimiento mensual.',
  },
  {
    q: '¿Puedo hacerlo si tengo marcapasos?',
    a: 'No. El par biomagnético está contraindicado en personas con marcapasos u otros dispositivos electrónicos implantados. Consúltanos antes si tienes dudas.',
  },
  {
    q: '¿Se nota algo durante la sesión?',
    a: 'La mayoría de personas sienten relajación profunda durante la sesión. Algunas notan ligero calor en las zonas tratadas. Es una experiencia muy tranquila.',
  },
]

const PARA_QUIEN = [
  'Cansancio crónico sin causa aparente',
  'Inflamación persistente en zonas concretas',
  'Digestiones pesadas y problemas intestinales',
  'Sistema inmune debilitado',
  'Tensión acumulada y estrés prolongado',
  'Desequilibrios hormonales leves',
]

const BENEFICIOS = [
  'Reequilibrio del pH corporal en zonas afectadas',
  'Reducción de la inflamación localizada',
  'Recuperación de la vitalidad y la energía',
  'Mejora del funcionamiento digestivo',
  'Refuerzo del sistema inmunológico',
  'Alivio del cansancio crónico',
  'Sensación de calma y bienestar tras la sesión',
]

const PASOS = [
  {
    num: '01',
    title: 'Valoración inicial',
    description:
      'Comenzamos identificando mediante kinesiología las zonas del cuerpo que presentan desequilibrio en su pH.',
  },
  {
    num: '02',
    title: 'Identificación de pares',
    description:
      'Localizamos los pares biomagnéticos — dos puntos del cuerpo conectados entre sí que necesitan ser tratados juntos.',
  },
  {
    num: '03',
    title: 'Aplicación de imanes',
    description:
      'Colocamos los imanes con la polaridad correcta en cada par identificado y los mantenemos el tiempo necesario para restablecer el equilibrio.',
  },
  {
    num: '04',
    title: 'Cierre y seguimiento',
    description:
      'Retiramos los imanes y valoramos tu respuesta. Te explicamos qué hemos encontrado y qué esperar en las próximas horas.',
  },
]

export default function ParBiomagnetico() {
  return (
    <div>

      {/* ── SECCIÓN 1: HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '50vh' }}>
        <Image
          src="/images/services/par-biomagnetico/hero.jpg"
          alt="Par Biomagnético en Tudela"
          fill
          unoptimized={true}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-verde-oscuro/50" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 pt-40">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            Equilibrio energético · 60 min
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Par Biomagnético
            
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 2: QUÉ ES ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

          {/* Texto */}
          <div>
            <SectionTitle
              tag="Sobre el tratamiento"
              title="El poder de los imanes para"
              titleEm="equilibrar tu cuerpo."
            />
            <p className="text-texto-muted font-light leading-relaxed text-base mb-5">
              El par biomagnético es una terapia natural que utiliza imanes de mediana intensidad
              para identificar y corregir desequilibrios en el pH de diferentes zonas del cuerpo.
              Fue desarrollado por el Dr. Isaac Goiz Durán y se basa en la relación entre el campo
              magnético y la salud celular.
            </p>
            <p className="text-texto-muted font-light leading-relaxed text-base">
              Cuando el pH de una zona se altera, el organismo pierde su capacidad de
              autorregulación. Los imanes aplicados en puntos específicos restauran ese equilibrio,
              permitiendo que el cuerpo active sus propios mecanismos de recuperación.
            </p>
          </div>

          {/* Card destacado */}
          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <ul className="space-y-5 mb-6">
              {[
                { label: 'Duración', value: '60 min' },
                { label: 'Tipo', value: 'Terapia energética no invasiva' },
                { label: 'Características', value: 'Sin agujas, sin dolor, sin medicamentos' },
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
              Reservar sesión
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: CÓMO ES UNA SESIÓN ── */}
      <section className="bg-blanco py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            tag="El proceso"
            title="Así es"
            titleEm="tu sesión."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-14">
            {PASOS.map((paso) => (
              <div key={paso.num} className="relative pl-6 border-l border-dorado/30">
                <div className="text-dorado/20 font-serif text-6xl font-light absolute -top-3 -left-3 select-none pointer-events-none leading-none">
                  {paso.num}
                </div>
                <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-2 relative z-10">
                  {paso.num}
                </div>
                <h3 className="font-serif text-texto text-xl font-light mb-2">{paso.title}</h3>
                <p className="text-texto-muted text-sm font-light leading-relaxed">
                  {paso.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-14 rounded-xl overflow-hidden" style={{ height: '400px' }}>
            <Image
              src="/images/services/par-biomagnetico/que-es.jpg"
              alt="Sesión de Par Biomagnético en Centrevit"
              fill
              unoptimized={true}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 4: PARA QUIÉN ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            tag="Indicaciones"
            title="¿Para quién es el"
            titleEm="par biomagnético?"
          />
          <p className="text-texto-muted font-light leading-relaxed text-base mb-8">
            Indicado para personas que buscan un enfoque natural para recuperar su equilibrio
            interno.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {PARA_QUIEN.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-blanco rounded-lg p-5 border border-crema-oscuro"
              >
                <span className="text-verde shrink-0 mt-0.5 text-lg leading-none">✓</span>
                <span className="text-texto text-sm font-light leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-texto-muted font-light leading-relaxed text-sm">
            Compatible con cualquier tratamiento médico convencional. Muchos pacientes lo usan como
            complemento a su medicina habitual.
          </p>
        </div>
      </section>

      {/* ── SECCIÓN 5: BENEFICIOS ── */}
      <section className="bg-blanco py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            tag="Qué conseguirás"
            title="Beneficios del"
            titleEm="tratamiento."
          />

          <div className="grid lg:grid-cols-2 gap-10 mt-10 items-start">

            {/* Placeholder imagen */}
            <div className="relative rounded-xl overflow-hidden order-2 lg:order-1" style={{ height: '400px' }}>
              <Image
                src="/images/services/par-biomagnetico/resultado.jpg"
                alt="Sesión de Par Biomagnético en Centrevit"
                fill
                unoptimized={true}
                className="object-cover"
              />
            </div>

            {/* Lista beneficios */}
            <div className="order-1 lg:order-2">
              {BENEFICIOS.map((b, i) => (
                <div key={b}>
                  <div className="flex items-start gap-4 py-4">
                    <span className="text-dorado shrink-0 mt-0.5 font-serif text-lg leading-none">
                      ✓
                    </span>
                    <span className="text-texto text-sm font-light leading-relaxed">{b}</span>
                  </div>
                  {i < BENEFICIOS.length - 1 && (
                    <div className="h-px bg-crema-oscuro" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 6: FAQ ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            tag="FAQ"
            title="Preguntas"
            titleEm="frecuentes."
          />

          <div className="mt-10 space-y-2">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-blanco border border-crema-oscuro rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                  <span className="font-serif text-texto text-base font-light">{q}</span>
                  <span
                    className="text-dorado shrink-0 text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-0">
                  <div className="h-px bg-crema-oscuro mb-4" />
                  <p className="text-texto-muted text-sm font-light leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 7: CTA FINAL ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#1C3A1E' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-serif font-light text-blanco leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            ¿Quieres recuperar tu equilibrio natural?
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            Sin agujas, sin dolor. Solo tu cuerpo recuperando lo que necesita.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              Reservar sesión de Par Biomagnético
            </Link>
            <Link
              href="/tratamientos"
              className="inline-flex items-center gap-2 border border-blanco/30 hover:border-blanco/60 text-blanco font-light px-8 py-4 rounded-sm transition-colors text-sm"
            >
              Ver todos los tratamientos
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
