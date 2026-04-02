import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies — Centrevit',
  description: 'Política de cookies de Centrevit. Información sobre el uso de cookies y tecnologías similares.',
}

export default function PoliticaCookiesPage() {
  return (
    <div>

      {/* ── HERO ── */}
      <section
        className="relative flex items-end overflow-hidden bg-verde-oscuro"
        style={{ minHeight: '30vh' }}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 pt-28">
          <div className="flex items-center gap-3 text-dorado text-xs font-medium tracking-[0.16em] uppercase mb-4">
            <span className="h-px w-7 bg-dorado" />
            Legal
          </div>
          <h1
            className="font-serif font-light text-blanco leading-tight"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Política de Cookies
          </h1>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">1. Introducción</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              El sitio web https://centrevit.es (en adelante: «el sitio web») utiliza cookies y tecnologías relacionadas. Las cookies también son instaladas por terceros contratados por nosotros. Este documento proporciona información sobre el uso de cookies en nuestro sitio web.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">2. ¿Qué son las cookies?</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              Una cookie es un pequeño archivo que se envía junto con las páginas del sitio web y que tu navegador almacena en el ordenador o dispositivo. La información almacenada puede devolverse a nuestros servidores o a los servidores de terceros correspondientes durante visitas posteriores.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">3. ¿Qué son los scripts?</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              Un script es un fragmento de código de programa que se utiliza para que nuestro sitio web funcione correctamente y de forma interactiva. Este código se ejecuta en nuestro servidor o en tu dispositivo.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">4. ¿Qué es una baliza web?</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              Una baliza web (o pixel tag) es un pequeño e invisible fragmento de texto o imagen en un sitio web que se utiliza para monitorizar el tráfico del sitio. A través de estas balizas se almacenan varios datos sobre ti.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">5. Tipos de cookies</h2>
            <div className="space-y-6">

              <div>
                <h3 className="font-serif font-light text-lg text-texto mb-2">5.1 Cookies técnicas o funcionales</h3>
                <p className="text-texto-muted text-sm font-light leading-relaxed">
                  Determinadas cookies garantizan el correcto funcionamiento del sitio web y recuerdan las preferencias del usuario. Estas cookies facilitan tu visita sin necesidad de introducir información repetidamente. Podemos instalarlas sin necesidad de consentimiento previo.
                </p>
              </div>

              <div>
                <h3 className="font-serif font-light text-lg text-texto mb-2">5.2 Cookies estadísticas</h3>
                <p className="text-texto-muted text-sm font-light leading-relaxed">
                  Las cookies estadísticas optimizan la experiencia del sitio web proporcionando información sobre su uso. Se solicita tu permiso para su instalación.
                </p>
              </div>

              <div>
                <h3 className="font-serif font-light text-lg text-texto mb-2">5.3 Cookies de marketing o rastreo</h3>
                <p className="text-texto-muted text-sm font-light leading-relaxed">
                  Estas cookies crean perfiles de usuario para fines publicitarios o para el seguimiento de marketing en varios sitios web.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">6. Cookies utilizadas</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              WordPress, Google Fonts y otros servicios utilizan cookies funcionales e investigativas con períodos de caducidad y funciones específicas debidamente documentadas.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">7. Consentimiento</h2>
            <div className="space-y-4 text-texto-muted text-sm font-light leading-relaxed">
              <p>En la primera visita al sitio web, un aviso emergente explica el uso de cookies. Al hacer clic en «Guardar preferencias» se aceptan las categorías seleccionadas tal y como se describe en esta política. Puedes desactivar las cookies a través de la configuración de tu navegador, aunque la funcionalidad del sitio puede verse afectada.</p>
              <h3 className="font-serif font-light text-lg text-texto mt-4 mb-2">7.1 Gestionar el consentimiento</h3>
              <p>Para gestionar tus preferencias de cookies, utiliza el botón de gestión de consentimiento disponible en la parte inferior de la página.</p>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">8. Activación, desactivación y eliminación de cookies</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              Puedes eliminar cookies de forma automática o manual a través de tu navegador. También puedes especificar qué cookies no deben instalarse o solicitar una notificación cuando se instalen. Consulta las instrucciones de ayuda de tu navegador para más detalles.
            </p>
            <p className="text-texto-muted text-sm font-light leading-relaxed mt-3">
              <strong className="text-texto font-normal">Nota:</strong> la funcionalidad del sitio puede verse comprometida si se deshabilitan todas las cookies. Las cookies eliminadas serán reemplazadas en la siguiente visita si se otorga el consentimiento.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">9. Tus derechos en materia de protección de datos</h2>
            <ul className="space-y-2 text-texto-muted text-sm font-light leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>Derecho a saber por qué se necesitan los datos, qué ocurre con ellos y cuánto tiempo se conservan</li>
              <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>Derecho de acceso a tus datos personales</li>
              <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>Derecho de rectificación para completar, corregir, suprimir o bloquear datos</li>
              <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>Derecho a revocar el consentimiento y solicitar la supresión de los datos</li>
              <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>Derecho a la portabilidad de datos para solicitarlos y transferirlos a otro responsable</li>
              <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>Derecho de oposición al tratamiento de datos salvo causas justificadas</li>
            </ul>
            <p className="text-texto-muted text-sm font-light leading-relaxed mt-4">
              Contáctanos para ejercer estos derechos o para presentar reclamaciones ante las autoridades supervisoras de protección de datos.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">10. Información de contacto</h2>
            <div className="space-y-1 text-texto-muted text-sm font-light leading-relaxed">
              <p>Jose Javier Rubio Carrera</p>
              <p>C. José Ramón Castro Álava, 41, 2ºA, 31500 Tudela, Navarra, España</p>
              <p>Sitio web: https://centrevit.es</p>
              <p>Email: javierxy@hotmail.com</p>
              <p>Teléfono: 679 41 71 38</p>
            </div>
            <p className="text-texto-muted text-xs font-light mt-4 italic">
              Política sincronizada con cookiedatabase.org el 15 de marzo de 2026.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
