import Link from 'next/link'
import Image from 'next/image'

export function BookingCTA() {
  return (
    <section className="relative overflow-hidden py-24 px-6">

      {/* Imagen de fondo — ocupa toda la sección */}
      <Image
        src="/images/booking-bg.webp"
        alt="Reserva tu sesión en Centrevit"
        fill
        unoptimized={true}
        className="object-cover"
      />

      {/* Overlay blanco/amarillo claro */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(255, 248, 220, 0.55)' }}
      />

      {/* Contenido encima */}
      <div className="relative z-10 max-w-7xl mx-auto flex justify-start">

        {/* Formulario flotante */}
        <div className="w-full max-w-lg bg-blanco rounded-2xl shadow-2xl p-8">
          <h3 className="font-serif font-light text-3xl text-texto mb-2">
            Reserva tu sesión
          </h3>
          <p className="text-texto-muted text-sm font-light mb-6">
            Cuéntanos qué síntomas quieres tratar.
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
                  Fecha preferida
                </label>
                <input
                  type="date"
                  className="w-full border border-crema-oscuro rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-texto-muted mb-1.5 tracking-wide">
                  Horario
                </label>
                <select className="w-full border border-crema-oscuro rounded-sm px-3 py-2.5 text-sm text-texto bg-crema focus:outline-none focus:border-verde transition-colors">
                  <option>Mañana</option>
                  <option>Tarde</option>
                  <option>Indiferente</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-verde-oscuro hover:bg-verde text-blanco font-medium text-sm py-3.5 rounded-sm transition-colors duration-200 tracking-wide"
            >
              Enviar solicitud
            </button>

            <p className="text-center text-xs text-texto-muted">
              Sin compromiso. Te respondemos en menos de 24h.
            </p>
          </form>

          <div className="mt-6 pt-6 border-t border-crema-oscuro space-y-2">
            <a href="tel:679417138" className="block text-sm text-texto-muted hover:text-verde transition-colors">
              679 41 71 38
            </a>
            <p className="text-sm text-texto-muted">
              C. José Ramón Castro Álava, 41, 2ºA — Tudela
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
