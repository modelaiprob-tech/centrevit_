import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background image */}
      <Image
        src="/images/hero-banner.webp"
        alt="Centrevit — Centro de bienestar en Tudela"
        fill
        className="object-cover"
        unoptimized={true}
        priority={true}
        sizes="100vw"
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/grain.svg')] bg-repeat bg-[length:200px]" />

      {/* Text zone overlay — blur + gradient solo en zona del texto, solo desktop */}
      <div
        className="hidden md:block absolute left-0 top-0 bottom-0 w-[35%]"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />

      {/* Content — left-aligned, z-index sobre el overlay */}
      <div className="relative z-10 w-full pl-4 md:pl-12 lg:pl-24 pr-4 md:pr-6 py-32">
        <div className="max-w-lg">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-6">
            <span className="h-px w-7 bg-dorado" />
            Salud · Bienestar · Tudela, Navarra
          </div>

          {/* H1 */}
          <h1
            className="font-serif font-light text-blanco leading-[1.08] mb-10"
            style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}
          >
            Tu espacio de bienestar
            <br />y <em className="italic text-dorado-claro">relajación.</em>
          </h1>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center mb-12">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 bg-dorado hover:bg-dorado-claro text-blanco font-medium px-7 py-3.5 rounded-sm transition-colors duration-200 text-sm tracking-wide"
            >
              Reservar sesión <span>→</span>
            </Link>
            <Link
              href="/tratamientos"
              className="text-blanco/70 hover:text-blanco text-sm flex items-center gap-2 transition-colors"
            >
              Ver tratamientos <span className="text-dorado">→</span>
            </Link>
          </div>

          {/* Social proof badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 group"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <span className="text-dorado/75 group-hover:text-dorado text-sm tracking-tight transition-colors duration-300">★★★★★</span>
            <div className="w-px h-3 bg-white/20" />
            <span className="text-blanco/85 text-xs font-light tracking-wide">Valorado por nuestros clientes · Confirmación en 24h</span>
          </div>

        </div>
      </div>
    </section>
  )
}
