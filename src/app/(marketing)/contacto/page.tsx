import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Contacto — Centrevit',
  description:
    'Contacta con Centrevit en Tudela, Navarra. Llámanos, escríbenos por WhatsApp o rellena el formulario. Te respondemos en menos de 24h.',
}

export default function ContactoPage() {
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
            Estamos en Tudela, Navarra
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Contacto
          </h1>
        </div>
      </section>

      {/* ── SECCIÓN 1: DATOS + FORMULARIO ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* Datos de contacto */}
          <div>
            <div className="space-y-6">
              <div>
                <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-1">
                  Dirección
                </div>
                <p className="text-texto text-sm font-light leading-relaxed">
                  C. José Ramón Castro Álava, 41, 2ºA<br />
                  31500 Tudela, Navarra
                </p>
              </div>

              <div>
                <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-1">
                  WhatsApp
                </div>
                <a
                  href="https://wa.me/34679417138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-texto text-sm font-light hover:text-verde transition-colors"
                >
                  679 41 71 38
                </a>
              </div>

              <div>
                <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-1">
                  Email
                </div>
                <a
                  href="mailto:javierxy@hotmail.com"
                  className="text-texto text-sm font-light hover:text-verde transition-colors"
                >
                  javierxy@hotmail.com
                </a>
              </div>

              <div>
                <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-1">
                  Redes sociales
                </div>
                <div className="space-y-1">
                  <p className="text-texto text-sm font-light">Instagram: @centrevit</p>
                  <p className="text-texto text-sm font-light">Facebook: Centrevit</p>
                </div>
              </div>

              <div>
                <div className="text-dorado text-xs font-medium tracking-widest uppercase mb-1">
                  Horario
                </div>
                <p className="text-texto text-sm font-light leading-relaxed">
                  Lunes a Viernes<br />
                  9:00–14:00 y 16:00–20:00
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-blanco rounded-xl p-8 border border-crema-oscuro shadow-sm">
            <h3 className="font-serif font-light text-2xl text-texto mb-2">
              Escríbenos
            </h3>
            <p className="text-texto-muted text-sm font-light mb-6">
              Te respondemos en menos de 24h.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full border border-crema-oscuro rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full border border-crema-oscuro rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="También por WhatsApp"
                  className="w-full border border-crema-oscuro rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
                  Tratamiento
                </label>
                <select className="w-full border border-crema-oscuro rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors">
                  <option value="">Selecciona un tratamiento</option>
                  <option>Par Biomagnético</option>
                  <option>Reflexología Podal</option>
                  <option>Quiromasaje Integrador</option>
                  <option>Presoterapia Ballancer</option>
                  <option>Manta FHOS LED</option>
                  <option>Método CENTREVIT (circuito completo)</option>
                  <option>No lo sé aún — necesito orientación</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
                  Mensaje
                </label>
                <textarea
                  rows={3}
                  placeholder="Cuéntanos qué síntomas quieres tratar..."
                  className="w-full border border-crema-oscuro rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-verde-oscuro hover:bg-verde text-blanco font-medium text-sm py-3.5 rounded-sm transition-colors duration-200 tracking-wide"
              >
                Enviar mensaje
              </button>

              <p className="text-center text-xs text-texto-muted">
                Sin compromiso. Te respondemos en menos de 24h.
              </p>
            </form>
          </div>
        </div>
      </section>

    </div>
  )
}
