import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal — Centrevit',
  description: 'Aviso legal de Centrevit. Información sobre el responsable del sitio web y condiciones de uso.',
}

export default function AvisoLegalPage() {
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
            Aviso Legal
          </h1>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Datos del responsable</h2>
            <div className="space-y-1 text-texto-muted text-sm font-light leading-relaxed">
              <p><span className="text-texto font-normal">Nombre:</span> Jose Javier Rubio Carrera</p>
              <p><span className="text-texto font-normal">NIF:</span> 16018210K</p>
              <p><span className="text-texto font-normal">Dirección:</span> C. José Ramón Castro Álava, 41, 2ºA, 31500 Tudela, Navarra</p>
              <p><span className="text-texto font-normal">Email:</span> javierxy@hotmail.com</p>
              <p><span className="text-texto font-normal">Dominio:</span> centrevit.es</p>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Objeto del sitio web</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              El sitio informa a los clientes sobre productos y servicios terapéuticos, datos de contacto, ubicación e información relacionada con el sector.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Marco legal aplicable</h2>
            <ul className="space-y-2 text-texto-muted text-sm font-light leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-dorado mt-0.5 shrink-0">—</span>Reglamento (UE) 2016/679 (RGPD) que regula el tratamiento de datos personales</li>
              <li className="flex items-start gap-2"><span className="text-dorado mt-0.5 shrink-0">—</span>Ley Orgánica 3/2018 de Protección de Datos Personales</li>
              <li className="flex items-start gap-2"><span className="text-dorado mt-0.5 shrink-0">—</span>Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico</li>
            </ul>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Condiciones de uso y responsabilidades</h2>
            <div className="space-y-4 text-texto-muted text-sm font-light leading-relaxed">
              <p>Los usuarios que accedan a este sitio aceptan todas las condiciones aquí recogidas. El responsable declina toda responsabilidad por daños derivados del uso indebido del sitio. El contenido es meramente informativo y no debe aplicarse necesariamente a casos concretos sin el asesoramiento legal correspondiente.</p>
              <p>El sitio puede ser modificado sin previo aviso. Pueden producirse errores técnicos, interrupciones del servidor y casos de fuerza mayor sin que ello genere responsabilidad. Los usuarios no deben llevar a cabo actividades ilícitas a través del sitio.</p>
              <p>El responsable se reserva el derecho de denegar el acceso en caso de incumplimiento de las condiciones.</p>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Propiedad intelectual</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              La programación, diseño, logotipos, textos y gráficos del sitio son propiedad del responsable o cuentan con licencia de uso. Su reproducción requiere autorización escrita. El contenido de terceros que aparezca en el sitio pertenece a sus respectivos propietarios con previa autorización.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Enlaces a terceros</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              El sitio puede incluir enlaces a sitios externos sin que el responsable asuma responsabilidad por su contenido, exactitud o legalidad. El contenido ilegal será eliminado de inmediato.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Ley aplicable y jurisdicción</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              La legislación española rige todas las relaciones derivadas del presente sitio. Las disputas se resolverán en los tribunales del domicilio del usuario.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
