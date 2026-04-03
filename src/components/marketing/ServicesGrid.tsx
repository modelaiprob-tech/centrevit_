import Link from 'next/link'
import Image from 'next/image'
import { SERVICIOS } from '@/types'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Imagen por slug — nombre de archivo coincide con el slug del servicio
const IMAGENES: Record<string, string> = {
  'par-biomagnetico':       '/images/services/par-biomagnetico.webp',
  'reflexologia-podal':     '/images/services/reflexologia-podal.webp',
  'quiromasaje-integrador': '/images/services/quiromasaje-integrador.webp',
  'presoterapia-ballancer': '/images/services/presoterapia-ballancer.webp',
  'manta-fhos-led':         '/images/services/manta-fhos-led.webp',
}

export function ServicesGrid() {
  return (
    <section className="bg-blanco py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          tag="Nuestros tratamientos"
          title="Terapias para tu"
          titleEm="bienestar."
          subtitle="No trabajamos tratamientos aislados. Trabajamos personas."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICIOS.map((servicio) => {
            const imagen = IMAGENES[servicio.slug]

            return (
              <Link
                key={servicio.slug}
                href={`/tratamientos/${servicio.slug}`}
                className="group relative overflow-hidden rounded-lg bg-verde-oscuro aspect-[4/3] flex flex-col justify-end"
              >
                {/* Imagen real o placeholder verde */}
                {imagen ? (
                  <Image
                    src={imagen}
                    alt={servicio.nombre}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-verde-claro/20" />
                )}

                {/* Overlay oscuro para legibilidad del texto */}
                <div className="absolute inset-0 bg-verde-oscuro/40 group-hover:bg-verde-oscuro/50 transition-colors duration-500" />

                <div className="relative z-10 p-6">
                  <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-2">
                    {servicio.subtitulo}
                  </div>
                  <h3 className="font-serif text-blanco text-2xl font-light mb-2">
                    {servicio.nombre}
                  </h3>
                  <p className="text-blanco/70 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                    {servicio.descripcion}
                  </p>
                  <span className="text-dorado-claro text-sm group-hover:gap-3 flex items-center gap-2 transition-all">
                    Saber más <span>→</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
