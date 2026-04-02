import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Quiromasaje Integrador en Tudela — Centrevit',
  description:
    'Masaje terapéutico en profundidad para liberar contracturas, mejorar la movilidad y reducir el dolor muscular crónico. Adaptado a cada persona. Reserva en Centrevit, Tudela.',
}

const FAQS = [
  {
    q: '¿Duele el quiromasaje?',
    a: 'Puede haber momentos de presión intensa en zonas muy contracturadas, pero nunca dolor insoportable. Siempre trabajamos dentro de tu umbral de tolerancia y puedes indicarnos en cualquier momento si quieres que ajustemos la intensidad.',
  },
  {
    q: '¿Cuánto tarda en notarse el resultado?',
    a: 'Muchos pacientes notan mejoría inmediata tras la sesión. Los efectos más profundos se consolidan en las 24-48 horas siguientes, cuando el músculo termina de liberar la tensión.',
  },
  {
    q: '¿Con qué frecuencia debo venir?',
    a: 'Para mantenimiento general, una sesión mensual es ideal. Para tratar contracturas o dolor crónico, recomendamos una sesión semanal durante 3-4 semanas.',
  },
  {
    q: '¿Puedo hacerlo si estoy embarazada?',
    a: 'Durante el embarazo adaptamos completamente las técnicas. Consulta con nosotros antes para valorar tu caso específico.',
  },
]

const PARA_QUIEN = [
  'Tensión en cuello, hombros y espalda',
  'Contracturas y nudos musculares',
  'Dolor por malas posturas o trabajo sedentario',
  'Sobrecarga deportiva y recuperación muscular',
  'Estrés físico acumulado',
  'Rigidez articular y falta de movilidad',
]

const BENEFICIOS = [
  'Eliminación de contracturas y nudos musculares',
  'Mejora inmediata de la movilidad articular',
  'Reducción del dolor muscular crónico',
  'Activación de la circulación sanguínea',
  'Liberación de tensión acumulada por estrés',
  'Mejora de la postura corporal',
  'Sensación de ligereza y bienestar que se mantiene días',
]

const PASOS = [
  {
    num: '01',
    title: 'Evaluación postural',
    description:
      'Antes de comenzar observamos tu postura y escuchamos tus zonas de mayor tensión o molestia para enfocar el trabajo donde más lo necesitas.',
  },
  {
    num: '02',
    title: 'Calentamiento muscular',
    description:
      'Comenzamos con maniobras suaves para calentar el tejido y preparar la musculatura, favoreciendo la vasodilatación y la relajación inicial.',
  },
  {
    num: '03',
    title: 'Trabajo en profundidad',
    description:
      'Aplicamos presiones progresivas, amasamientos y fricciones profundas para liberar nudos, contracturas y adherencias musculares.',
  },
  {
    num: '04',
    title: 'Cierre y estiramientos',
    description:
      'Terminamos con maniobras suaves de cierre, estiramientos pasivos y recomendaciones para mantener los resultados en casa.',
  },
]

export default function QuiromasajeIntegrador() {
  return (
    <div>

      {/* ── SECCIÓN 1: HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '50vh' }}>
        <Image
          src="/images/services/quiromasaje-integrador.webp"
          alt="Quiromasaje Integrador en Tudela"
          fill
          unoptimized={true}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-verde-oscuro/50" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 pt-40">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            Liberación muscular · 60 min
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Quiromasaje Integrador
            
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 2: QUÉ ES ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

          <div>
            <SectionTitle
              tag="Sobre el tratamiento"
              title="Tu cuerpo suelto,"
              titleEm="tu mente libre."
            />
            <p className="text-texto-muted font-light leading-relaxed text-base mb-5">
              El quiromasaje integrador es una técnica manual que combina diferentes métodos de
              masaje terapéutico para trabajar la musculatura en profundidad. A diferencia del masaje
              relajante convencional, el quiromasaje actúa directamente sobre las zonas de tensión
              crónica, nudos musculares y contracturas.
            </p>
            <p className="text-texto-muted font-light leading-relaxed text-base">
              Integramos técnicas de masaje sueco, presiones profundas, movilizaciones articulares y
              drenaje muscular para conseguir resultados reales y duraderos. Cada sesión se adapta
              completamente a tu estado físico del momento.
            </p>
          </div>

          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <ul className="space-y-5 mb-6">
              {[
                { label: 'Duración', value: '60 min' },
                { label: 'Tipo', value: 'Terapia manual' },
                { label: 'Intensidad', value: 'Adaptada a cada persona' },
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
              src="/images/services/quiromasaje-integrador/sesion.webp"
              alt="Sesión de Quiromasaje Integrador en Centrevit"
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
            title="¿Para quién es"
            titleEm="el quiromasaje?"
          />
          <p className="text-texto-muted font-light leading-relaxed text-base mb-8">
            Indicado para cualquier persona que acumule tensión física, independientemente de su
            edad o actividad.
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
            Especialmente recomendado para personas con trabajos de oficina, deportistas y quienes
            sufren estrés crónico.
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

          <div className="max-w-2xl mt-10">
            {BENEFICIOS.map((b, i) => (
              <div key={b}>
                <div className="flex items-start gap-4 py-4">
                  <span className="text-dorado shrink-0 mt-0.5 font-serif text-lg leading-none">✓</span>
                  <span className="text-texto text-sm font-light leading-relaxed">{b}</span>
                </div>
                {i < BENEFICIOS.length - 1 && <div className="h-px bg-crema-oscuro" />}
              </div>
            ))}
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
            ¿Listo para soltar toda esa tensión?
          </h2>
          <p className="text-blanco/70 font-light text-base mb-10">
            Una sesión y notarás la diferencia. Tu cuerpo lleva tiempo pidiéndotelo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-8 py-4 rounded-sm transition-colors text-sm tracking-wide"
            >
              Reservar sesión de Quiromasaje
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
