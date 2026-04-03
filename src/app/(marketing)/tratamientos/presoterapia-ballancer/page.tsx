import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Presoterapia Ballancer en Tudela — Centrevit',
  description:
    'Compresión neumática secuencial para drenar líquidos, aliviar piernas pesadas y mejorar la circulación. Sin dolor, resultados desde la primera sesión. Reserva en Centrevit, Tudela.',
}

const FAQS = [
  {
    q: '¿Es doloroso?',
    a: 'En absoluto. La presoterapia es completamente indolora y muy relajante. La mayoría de personas se quedan dormidas durante la sesión.',
  },
  {
    q: '¿Cuántas sesiones necesito para ver resultados?',
    a: 'Los resultados son visibles desde la primera sesión. Para resultados más duraderos en retención de líquidos o celulitis recomendamos un ciclo de 8-10 sesiones.',
  },
  {
    q: '¿Tiene contraindicaciones?',
    a: 'Está contraindicada en casos de trombosis venosa profunda, insuficiencia cardíaca grave, infecciones agudas en las extremidades o embarazo. Consúltanos si tienes dudas.',
  },
  {
    q: '¿Puedo hacerlo si tengo varices?',
    a: 'Depende del grado. Las varices leves no son contraindicación. Las varices muy pronunciadas o con flebitis requieren valoración médica previa.',
  },
]

const PARA_QUIEN = [
  'Retención de líquidos y piernas hinchadas',
  'Sensación de pesadez en piernas y pies',
  'Mala circulación venosa o linfática',
  'Celulitis y acumulación de toxinas',
  'Recuperación deportiva post-esfuerzo',
  'Cansancio de piernas por trabajo de pie',
]

const BENEFICIOS = [
  'Reducción inmediata de la hinchazón en piernas y pies',
  'Mejora del retorno venoso y linfático',
  'Eliminación de toxinas y líquidos retenidos',
  'Alivio de la celulitis con sesiones regulares',
  'Recuperación muscular acelerada tras el deporte',
  'Sensación de ligereza que dura varios días',
  'Mejora de la circulación general del organismo',
]

const PASOS = [
  {
    num: '01',
    title: 'Recepción y valoración',
    description:
      'Antes de comenzar valoramos tus objetivos y estado general para ajustar la presión y el programa más adecuado para ti.',
  },
  {
    num: '02',
    title: 'Colocación de las prendas',
    description:
      'Te colocas las prendas Ballancer — pantalón y/o chaqueta — y te acomodas en la camilla en una posición cómoda y relajada.',
  },
  {
    num: '03',
    title: 'Sesión de compresión',
    description:
      'El sistema actúa de forma automática durante 45 minutos aplicando presión secuencial desde los pies hacia el abdomen, favoreciendo el retorno venoso y el drenaje linfático.',
  },
  {
    num: '04',
    title: 'Resultado inmediato',
    description:
      'Al terminar notarás de inmediato una sensación de ligereza en las piernas y reducción de la pesadez. Los resultados mejoran con sesiones regulares.',
  },
]

export default function PresoterapiaBallancer() {
  return (
    <div>

      {/* ── SECCIÓN 1: HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '50vh' }}>
        <Image
          src="/images/services/presoterapia-ballancer.webp"
          alt="Presoterapia Ballancer en Tudela"
          fill
          unoptimized={true}
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-verde-oscuro/50" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 pt-40">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            Drenaje y ligereza · 45 min
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Presoterapia Ballancer
            
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 2: QUÉ ES ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

          <div>
            <SectionTitle
              tag="Sobre el tratamiento"
              title="Piernas ligeras,"
              titleEm="cuerpo renovado."
            />
            <p className="text-texto-muted font-light leading-relaxed text-base mb-5">
              La presoterapia Ballancer es una técnica de compresión neumática secuencial que actúa
              sobre el sistema linfático y venoso. A través de unas prendas especiales que se inflan
              de forma progresiva, simula el efecto de un drenaje linfático manual pero de forma más
              uniforme y constante.
            </p>
            <p className="text-texto-muted font-light leading-relaxed text-base">
              El sistema Ballancer está reconocido médicamente y es utilizado tanto en clínicas
              estéticas como en centros de recuperación deportiva y unidades de fisioterapia. Su
              acción mecánica precisa lo convierte en uno de los tratamientos más eficaces para
              mejorar la circulación y reducir la retención de líquidos.
            </p>
          </div>

          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <ul className="space-y-5 mb-6">
              {[
                { label: 'Duración', value: '45 min' },
                { label: 'Tipo', value: 'Terapia de compresión neumática' },
                { label: 'Características', value: 'No invasiva · Sin dolor' },
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
              src="/images/services/presoterapia-ballancer/sesion.webp"
              alt="Sesión de Presoterapia Ballancer en Centrevit"
              fill
              unoptimized={true}
              sizes="(max-width: 1024px) 100vw, 60vw"
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
            title="¿Para quién es"
            titleEm="la presoterapia?"
          />
          <p className="text-texto-muted font-light leading-relaxed text-base mb-8">
            Indicada para quienes buscan mejorar su circulación, reducir la retención de líquidos o
            recuperarse del esfuerzo físico.
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
            También muy recomendada como tratamiento preventivo para quienes pasan muchas horas de
            pie o sentados durante la jornada laboral.
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
                src="/images/services/presoterapia-ballancer/resultado.webp"
                alt="Resultado de Presoterapia Ballancer en Centrevit"
                fill
                unoptimized={true}
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              {BENEFICIOS.map((b, i) => (
                <div key={b}>
                  <div className="flex items-start gap-4 py-4">
                    <span className="text-dorado shrink-0 mt-0.5 font-serif text-lg leading-none">
                      ✓
                    </span>
                    <span className="text-texto text-sm font-light leading-relaxed">{b}</span>
                  </div>
                  {i < BENEFICIOS.length - 1 && <div className="h-px bg-crema-oscuro" />}
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
            ¿Preparado para sentir tus piernas nuevas?
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            45 minutos y saldrás caminando diferente. Sin esfuerzo, sin dolor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              Reservar sesión de Presoterapia
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
