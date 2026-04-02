import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Centrevit',
  description: 'Política de privacidad de Centrevit. Información sobre el tratamiento de datos personales.',
}

export default function PoliticaPrivacidadPage() {
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
            Política de Privacidad
          </h1>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              <strong className="text-texto font-normal">Jose Javier Rubio Carrera</strong> mantiene un compromiso firme con el cumplimiento de la normativa española y europea de protección de datos personales, garantizando el pleno cumplimiento de las obligaciones y medidas de seguridad establecidas en el Reglamento (UE) 2016/679 (RGPD) de 27 de abril y la Ley Orgánica 3/2018 de 5 de diciembre de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPD).
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Recogida y tratamiento de datos</h2>
            <div className="space-y-4 text-texto-muted text-sm font-light leading-relaxed">
              <p>Los datos personales son cualquier información que identifique a una persona: nombre, correo electrónico, dirección, teléfono, NIF/NIE. Las visitas al sitio web almacenan automáticamente información técnica como las direcciones IP.</p>
              <p>Jose Javier Rubio Carrera, como Responsable del Tratamiento, informa a los usuarios sobre la recogida de datos personales a través de formularios de contacto o correo electrónico. Solo se recaban los datos necesarios para los servicios contratados o las solicitudes de información. No se recopilan categorías especiales de datos protegidos.</p>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Formularios de contacto y correo electrónico</h2>
            <div className="space-y-2 text-texto-muted text-sm font-light leading-relaxed">
              <p><span className="text-texto font-normal">Finalidad:</span> Responder a solicitudes de información.</p>
              <p><span className="text-texto font-normal">Base legal:</span> Consentimiento del usuario (revocable).</p>
              <p><span className="text-texto font-normal">Encargado del tratamiento:</span> Servidores de Siteground.</p>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Menores de edad</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              Las personas menores de 14 años no pueden facilitar datos personales. Los mayores de 14 años requieren consentimiento parental. La contratación de servicios requiere ser mayor de 18 años o contar con el consentimiento de los padres o tutores legales (salvo emancipación).
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Medidas de seguridad</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              Se aplican medidas técnicas y organizativas de seguridad para prevenir la pérdida, el mal uso, la alteración, el acceso no autorizado y el robo de datos. Los formularios están protegidos con cifrado SSL. La exactitud de los datos es responsabilidad del usuario.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Cesión de datos</h2>
            <div className="space-y-4 text-texto-muted text-sm font-light leading-relaxed">
              <p>Jose Javier Rubio Carrera no cede datos a terceros salvo obligación legal o cuando la prestación del servicio requiera Encargados del Tratamiento (plataformas de pago, asesorías contables). El usuario puede oponerse mediante solicitud escrita.</p>
              <p>Los datos de clientes podrán transferirse a autoridades (Agencia Tributaria, entidades bancarias, Inspección de Trabajo) en cumplimiento de obligaciones legales.</p>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Derechos del usuario</h2>
            <div className="space-y-4 text-texto-muted text-sm font-light leading-relaxed">
              <p>Los usuarios pueden solicitar el acceso, la rectificación, la supresión, la limitación del tratamiento, la portabilidad o la retirada del consentimiento enviando un correo a <strong className="text-texto font-normal">javierxy@hotmail.com</strong> o comunicación escrita a la dirección legal, aportando documentación que acredite la identidad. Las solicitudes se ejecutarán en el plazo máximo de un mes establecido por la ley.</p>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Conservación de datos</h2>
            <div className="space-y-2 text-texto-muted text-sm font-light leading-relaxed">
              <p>Los datos de formularios y correo electrónico se conservan únicamente durante el período necesario hasta la retirada del consentimiento. Los datos de clientes se conservan según los plazos legales:</p>
              <ul className="mt-3 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>4 años: obligaciones de seguridad social</li>
                <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>5 años: acciones personales del Código Civil</li>
                <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>6 años: registros contables del Código de Comercio</li>
                <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>10 años: ley de prevención del blanqueo de capitales</li>
                <li className="flex items-start gap-2"><span className="text-dorado shrink-0 mt-0.5">—</span>Sin límite: datos anonimizados y desagregados</li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Redes sociales</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              Jose Javier Rubio Carrera gestiona perfiles en Instagram como Responsable del Tratamiento de los datos publicados por los seguidores. Finalidad: informar sobre actividades y ofertas, y atender al cliente. Base legal: consentimiento del usuario (revocable). No se extraen datos salvo consentimiento explícito.
            </p>
          </div>

          <div className="h-px bg-crema-oscuro" />

          <div>
            <h2 className="font-serif font-light text-2xl text-texto mb-4">Confidencialidad</h2>
            <p className="text-texto-muted text-sm font-light leading-relaxed">
              La información de los clientes es confidencial. Jose Javier Rubio Carrera prohíbe la divulgación de solicitudes de los usuarios, finalidades de asesoramiento o duración del contrato.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
