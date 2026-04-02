import Link from 'next/link'
import Image from 'next/image'
import { SectionTitle } from '@/components/ui/SectionTitle'

export function SobreNosotros() {
  return (
    <section className="bg-verde-oscuro py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionTitle
            tag="Quiénes somos"
            title="CENTREVIT, bienestar"
            titleEm="integral."
            subtitle="CENTREVIT es un centro de terapias naturales en Tudela especializado en el equilibrio del cuerpo, la mente y la energía."
            light
          />

          <p className="text-blanco/60 text-sm font-light leading-relaxed mb-8">
            No trabajamos tratamientos aislados. Trabajamos personas. Por eso integramos
            diferentes técnicas terapéuticas que actúan de manera conjunta, potenciando sus
            beneficios y adaptándose a las necesidades reales de cada cuerpo.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              'Alivio de molestias crónicas',
              'Recuperación deportiva y muscular',
              'Prevención, autocuidado y mantenimiento del bienestar',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-blanco/80 text-sm font-light">
                <span className="text-dorado mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/centrevit"
            className="inline-flex items-center gap-2 text-dorado-claro text-sm hover:text-blanco transition-colors"
          >
            Conoce más sobre Centrevit <span>→</span>
          </Link>
        </div>

        <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <Image
            src="/images/Javier.png"
            alt="Javier — Terapeuta en Centrevit Tudela"
            fill
            unoptimized={true}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}