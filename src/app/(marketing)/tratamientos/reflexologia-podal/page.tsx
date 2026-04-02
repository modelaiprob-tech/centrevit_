import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Reflexología Podal en Tudela — Centrevit',
  description:
    'Terapia natural basada en la estimulación de puntos reflejos en los pies. Alivia el estrés, mejora la circulación y activa el bienestar desde dentro. Reserva en Centrevit, Tudela.',
}

const FAQS = [
  {
    q: '¿Duele la reflexología podal?',
    a: 'No duele. Puede haber zonas con mayor sensibilidad que otras, lo que nos indica qué áreas necesitan más atención. La presión siempre se adapta a tu tolerancia.',
  },
  {
    q: '¿Cuántas sesiones necesito?',
    a: 'Depende de tu objetivo. Para bienestar general, una sesión mensual es suficiente. Para tratar síntomas concretos, recomendamos entre 4 y 6 sesiones seguidas.',
  },
  {
    q: '¿Qué debo hacer antes de la sesión?',
    a: 'No es necesaria ninguna preparación especial. Te recomendamos venir con ropa cómoda y evitar comidas muy copiosas justo antes.',
  },
  {
    q: '¿Es compatible con otros tratamientos?',
    a: 'Sí, la reflexología es perfectamente compatible con cualquier otro tratamiento médico o terapia natural. De hecho, potencia sus efectos.',
  },
]

const PARA_QUIEN = [
  'Estrés y ansiedad acumulada',
  'Insomnio y dificultad para descansar',
  'Tensión muscular y contracturas',
  'Problemas de circulación',
  'Sensibilidad nerviosa',
  'Cansancio físico y mental',
]

const BENEFICIOS = [
  'Liberación de tensiones y bloqueos acumulados',
  'Mejora de la circulación sanguínea y linfática',
  'Regulación del sistema nervioso',
  'Reducción del estrés y la ansiedad',
  'Mejora de la calidad del sueño',
  'Activación de los mecanismos naturales de recuperación',
  'Sensación de ligereza y bienestar general',
]

const PASOS = [
  {
    num: '01',
    title: 'Bienvenida y valoración',
    description:
      'Comenzamos con una breve conversación para entender tu estado actual, síntomas y objetivos.',
  },
  {
    num: '02',
    title: 'Preparación de los pies',
    description:
      'Realizamos una limpieza y relajación inicial de los pies para activar la circulación y preparar la zona.',
  },
  {
    num: '03',
    title: 'Trabajo reflexológico',
    description:
      'Aplicamos presiones específicas en las zonas reflejas según tus necesidades, trabajando todos los sistemas del organismo.',
  },
  {
    num: '04',
    title: 'Cierre y recomendaciones',
    description:
      'Terminamos con un masaje suave de cierre y te damos pautas personalizadas para potenciar los resultados.',
  },
]

export default function ReflexologiaPodal() {
  return (
    <div>

      {/* ── SECCIÓN 1: HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '50vh' }}>
        <Image
          src="/images/services/reflexologia-podal.webp"
          alt="Reflexología Podal en Tudela"
          fill
          unoptimized={true}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-verde-oscuro/50" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 pt-40">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            Estimulación natural · 60 min
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Reflexología Podal
            
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
              title="Una terapia milenaria con"
              titleEm="resultados reales."
            />
            <p className="text-texto-muted font-light leading-relaxed text-base mb-5">
              La reflexología podal es una técnica terapéutica basada en la estimulación de puntos
              reflejos en los pies. Cada zona del pie está conectada a través del sistema nervioso
              con órganos, glándulas y sistemas del cuerpo.
            </p>
            <p className="text-texto-muted font-light leading-relaxed text-base">
              Aplicando presiones precisas en estas zonas, activamos la capacidad natural del
              organismo para regularse, liberando bloqueos y favoreciendo el equilibrio interno.
            </p>
          </div>

          {/* Card destacado */}
          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <ul className="space-y-5 mb-6">
              {[
                { label: 'Duración', value: '60 min' },
                { label: 'Tipo', value: 'Terapia natural no invasiva' },
                { label: 'Indicada para', value: 'Adultos y mayores' },
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
              src="/images/services/reflexologia-podal/hero.webp"
              alt="Sesión de Reflexología Podal en Centrevit"
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
            title="¿Para quién es la"
            titleEm="reflexología podal?"
          />
          <p className="text-texto-muted font-light leading-relaxed text-base mb-8">
            Especialmente indicada para personas que buscan un enfoque natural para mejorar su
            bienestar.
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
            También recomendada como terapia preventiva y de mantenimiento para quienes quieren
            cuidar su salud de forma natural.
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

            <div className="relative rounded-xl overflow-hidden order-2 lg:order-1" style={{ height: '400px' }}>
              <Image
                src="/images/services/reflexologia-podal/sesion.webp"
                alt="Beneficios de la Reflexología Podal"
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
          <h2 className="font-serif font-light text-blanco leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            ¿Lista para sentirte mejor?
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            Primera sesión adaptada completamente a ti. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              Reservar sesión de reflexología
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
