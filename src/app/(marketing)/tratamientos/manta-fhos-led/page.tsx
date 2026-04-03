import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Manta FHOS LED en Tudela — Centrevit',
  description:
    'Fototerapia avanzada con luz infrarroja y LED para regeneración celular, recuperación muscular y relajación profunda. 30 minutos. Reserva en Centrevit, Tudela.',
}

const FAQS = [
  {
    q: '¿Es segura la fototerapia LED?',
    a: 'Completamente. La Manta FHOS LED utiliza longitudes de onda no ionizantes, sin radiación UV. Es una tecnología avalada médicamente y sin efectos secundarios conocidos.',
  },
  {
    q: '¿Cuántas sesiones necesito?',
    a: 'Para recuperación puntual, una sesión es suficiente. Para objetivos de regeneración o antiaging recomendamos un ciclo de 6-8 sesiones, una o dos por semana.',
  },
  {
    q: '¿Puedo hacerlo si soy sensible al calor?',
    a: 'La intensidad del calor es regulable. Adaptamos siempre el programa a tu tolerancia para que la experiencia sea completamente confortable.',
  },
  {
    q: '¿Está contraindicada en algún caso?',
    a: 'Está contraindicada en embarazo, epilepsia fotosensible y sobre zonas con implantes metálicos. Consulta con nosotros antes si tienes alguna duda.',
  },
]

const PARA_QUIEN = [
  'Fatiga muscular y recuperación deportiva',
  'Dolor articular y muscular crónico',
  'Piel apagada y falta de vitalidad',
  'Estrés y tensión acumulada',
  'Recuperación post-lesión',
  'Búsqueda de bienestar general y antiaging',
]

const BENEFICIOS = [
  'Estimulación de la regeneración celular',
  'Reducción del dolor muscular y articular',
  'Mejora de la circulación sanguínea local',
  'Relajación profunda del sistema nervioso',
  'Efecto antiinflamatorio natural',
  'Mejora de la elasticidad y vitalidad de la piel',
  'Recuperación acelerada tras el ejercicio',
]

const PASOS = [
  {
    num: '01',
    title: 'Preparación',
    description:
      'Te acomodas en la camilla en ropa cómoda. La manta se coloca sobre tu cuerpo adaptándose a tu forma para maximizar el contacto y la absorción de luz.',
  },
  {
    num: '02',
    title: 'Activación',
    description:
      'Activamos el programa de luz específico según tu objetivo — relajación, recuperación o regeneración. Cada programa combina diferentes longitudes de onda.',
  },
  {
    num: '03',
    title: 'Sesión de fototerapia',
    description:
      'Durante 30 minutos la manta emite luz infrarroja y LED que penetra en los tejidos, generando calor profundo y activando la circulación celular. Una experiencia profundamente relajante.',
  },
  {
    num: '04',
    title: 'Resultado inmediato',
    description:
      'Al terminar notarás el cuerpo caliente, relajado y con una sensación de vitalidad renovada. Los efectos regenerativos continúan durante horas después.',
  },
]

export default function MantaFhosLed() {
  return (
    <div>

      {/* ── SECCIÓN 1: HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '50vh' }}>
        <Image
          src="/images/services/manta-fhos-led.webp"
          alt="Manta FHOS LED en Tudela"
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
            Regeneración celular · 30 min
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Manta FHOS LED
            
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 2: QUÉ ES ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

          <div>
            <SectionTitle
              tag="Sobre el tratamiento"
              title="Luz que sana"
              titleEm="desde dentro."
            />
            <p className="text-texto-muted font-light leading-relaxed text-base mb-5">
              La Manta FHOS LED es un dispositivo de fototerapia avanzada que emite luz infrarroja y
              LED de diferentes longitudes de onda para actuar directamente sobre las células del
              organismo. Esta tecnología, utilizada en medicina deportiva y recuperación clínica,
              estimula la producción de energía celular y activa los procesos naturales de
              regeneración.
            </p>
            <p className="text-texto-muted font-light leading-relaxed text-base">
              A diferencia de otros tratamientos, la manta actúa desde el exterior hacia el interior
              del cuerpo, penetrando en los tejidos y generando calor terapéutico profundo. El
              resultado es una relajación total del sistema muscular y nervioso, combinada con una
              regeneración celular progresiva.
            </p>
          </div>

          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <ul className="space-y-5 mb-6">
              {[
                { label: 'Duración', value: '30 min' },
                { label: 'Tipo', value: 'Fototerapia con luz infrarroja y LED' },
                { label: 'Características', value: 'No invasiva · Sin efectos secundarios' },
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
              src="/images/services/manta-fhos-led/sesion.webp"
              alt="Sesión de Manta FHOS LED en Centrevit"
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
            title="¿Para quién es la"
            titleEm="Manta FHOS LED?"
          />
          <p className="text-texto-muted font-light leading-relaxed text-base mb-8">
            Indicada para quienes buscan recuperación, regeneración y relajación profunda en poco
            tiempo.
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
            Compatible con todos los demás tratamientos de Centrevit. De hecho, muchos pacientes la
            combinan con reflexología o quiromasaje para potenciar los resultados.
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
                src="/images/services/manta-fhos-led/resultado.webp"
                alt="Resultado de Manta FHOS LED en Centrevit"
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
            ¿Te mereces 30 minutos de regeneración total?
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            Media hora. Cuerpo renovado, mente en calma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              Reservar sesión de Manta FHOS LED
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
