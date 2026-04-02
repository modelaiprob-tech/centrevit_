import { SectionTitle } from '@/components/ui/SectionTitle'

const PASOS = [
  {
    num: '01',
    title: 'Contacto inicial',
    description: 'Escríbenos por WhatsApp, email o formulario web. Cuéntanos qué síntomas quieres tratar.',
  },
  {
    num: '02',
    title: 'Reserva tu cita',
    description: 'Fijamos día y hora. Y te explicamos en qué va a consistir la sesión antes de venir.',
  },
  {
    num: '03',
    title: 'Primera sesión',
    description: 'Adaptada a tu estado corporal para que salgas con una sensación real de descanso.',
  },
]

export function ComoFunciona() {
  return (
    <section className="relative overflow-hidden bg-blanco py-24 px-6">

      {/* Rama — esquina superior izquierda */}
      <svg width="280" height="280" viewBox="0 0 180 180" fill="none"
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0.07 }}>
        <path d="M10 170 Q30 120 80 100 Q120 80 160 20" stroke="#33763D" strokeWidth="1.5" fill="none"/>
        <path d="M10 170 Q50 140 90 110 Q130 90 170 40" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M30 160 Q40 130 70 115" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M60 145 Q65 120 85 108" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M90 128 Q95 108 110 98" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M120 110 Q125 92 140 84" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M145 88 Q152 72 165 62" stroke="#33763D" strokeWidth="1" fill="none"/>
        <ellipse cx="75" cy="112" rx="8" ry="4" transform="rotate(-30 75 112)" fill="#33763D"/>
        <ellipse cx="95" cy="100" rx="7" ry="3.5" transform="rotate(-40 95 100)" fill="#33763D"/>
        <ellipse cx="115" cy="90" rx="6" ry="3" transform="rotate(-50 115 90)" fill="#33763D"/>
        <ellipse cx="50" cy="130" rx="6" ry="3" transform="rotate(-20 50 130)" fill="#33763D"/>
        <ellipse cx="135" cy="80" rx="6" ry="3" transform="rotate(-55 135 80)" fill="#33763D"/>
        <ellipse cx="152" cy="68" rx="5" ry="2.5" transform="rotate(-60 152 68)" fill="#33763D"/>
        <ellipse cx="170" cy="55" rx="5" ry="2.5" transform="rotate(-65 170 55)" fill="#33763D"/>
      </svg>

      {/* Rama — esquina superior derecha */}
      <svg width="280" height="280" viewBox="0 0 180 180" fill="none"
        style={{ position: 'absolute', top: 0, right: 0, opacity: 0.07, transform: 'scaleX(-1)' }}>
        <path d="M10 170 Q30 120 80 100 Q120 80 160 20" stroke="#33763D" strokeWidth="1.5" fill="none"/>
        <path d="M10 170 Q50 140 90 110 Q130 90 170 40" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M30 160 Q40 130 70 115" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M60 145 Q65 120 85 108" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M90 128 Q95 108 110 98" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M120 110 Q125 92 140 84" stroke="#33763D" strokeWidth="1" fill="none"/>
        <ellipse cx="75" cy="112" rx="8" ry="4" transform="rotate(-30 75 112)" fill="#33763D"/>
        <ellipse cx="95" cy="100" rx="7" ry="3.5" transform="rotate(-40 95 100)" fill="#33763D"/>
        <ellipse cx="115" cy="90" rx="6" ry="3" transform="rotate(-50 115 90)" fill="#33763D"/>
        <ellipse cx="50" cy="130" rx="6" ry="3" transform="rotate(-20 50 130)" fill="#33763D"/>
        <ellipse cx="135" cy="80" rx="6" ry="3" transform="rotate(-55 135 80)" fill="#33763D"/>
      </svg>

      {/* Rama — esquina inferior izquierda */}
      <svg width="280" height="280" viewBox="0 0 180 180" fill="none"
        style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.07, transform: 'scaleY(-1)' }}>
        <path d="M10 170 Q30 120 80 100 Q120 80 160 20" stroke="#33763D" strokeWidth="1.5" fill="none"/>
        <path d="M10 170 Q50 140 90 110 Q130 90 170 40" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M30 160 Q40 130 70 115" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M60 145 Q65 120 85 108" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M90 128 Q95 108 110 98" stroke="#33763D" strokeWidth="1" fill="none"/>
        <ellipse cx="75" cy="112" rx="8" ry="4" transform="rotate(-30 75 112)" fill="#33763D"/>
        <ellipse cx="95" cy="100" rx="7" ry="3.5" transform="rotate(-40 95 100)" fill="#33763D"/>
        <ellipse cx="115" cy="90" rx="6" ry="3" transform="rotate(-50 115 90)" fill="#33763D"/>
        <ellipse cx="50" cy="130" rx="6" ry="3" transform="rotate(-20 50 130)" fill="#33763D"/>
      </svg>

      {/* Rama — esquina inferior derecha */}
      <svg width="280" height="280" viewBox="0 0 180 180" fill="none"
        style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07, transform: 'rotate(180deg)' }}>
        <path d="M10 170 Q30 120 80 100 Q120 80 160 20" stroke="#33763D" strokeWidth="1.5" fill="none"/>
        <path d="M10 170 Q50 140 90 110 Q130 90 170 40" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M30 160 Q40 130 70 115" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M60 145 Q65 120 85 108" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M90 128 Q95 108 110 98" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M120 110 Q125 92 140 84" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M145 88 Q152 72 165 62" stroke="#33763D" strokeWidth="1" fill="none"/>
        <ellipse cx="75" cy="112" rx="8" ry="4" transform="rotate(-30 75 112)" fill="#33763D"/>
        <ellipse cx="95" cy="100" rx="7" ry="3.5" transform="rotate(-40 95 100)" fill="#33763D"/>
        <ellipse cx="115" cy="90" rx="6" ry="3" transform="rotate(-50 115 90)" fill="#33763D"/>
        <ellipse cx="50" cy="130" rx="6" ry="3" transform="rotate(-20 50 130)" fill="#33763D"/>
        <ellipse cx="135" cy="80" rx="6" ry="3" transform="rotate(-55 135 80)" fill="#33763D"/>
        <ellipse cx="152" cy="68" rx="5" ry="2.5" transform="rotate(-60 152 68)" fill="#33763D"/>
        <ellipse cx="170" cy="55" rx="5" ry="2.5" transform="rotate(-65 170 55)" fill="#33763D"/>
      </svg>

      {/* Rama central — fondo tenue */}
      <svg width="320" height="200" viewBox="0 0 320 200" fill="none"
        style={{ position: 'absolute', top: '50%', left: '50%', opacity: 0.04, transform: 'translate(-50%, -50%)' }}>
        <path d="M10 100 Q80 40 160 100 Q240 160 310 100" stroke="#33763D" strokeWidth="1.5" fill="none"/>
        <path d="M10 120 Q80 60 160 120 Q240 180 310 120" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M60 80 Q90 50 120 75" stroke="#33763D" strokeWidth="1" fill="none"/>
        <path d="M190 120 Q220 90 250 115" stroke="#33763D" strokeWidth="1" fill="none"/>
        <ellipse cx="90" cy="62" rx="7" ry="3" transform="rotate(20 90 62)" fill="#33763D"/>
        <ellipse cx="120" cy="72" rx="6" ry="3" transform="rotate(10 120 72)" fill="#33763D"/>
        <ellipse cx="220" cy="98" rx="7" ry="3" transform="rotate(-10 220 98)" fill="#33763D"/>
        <ellipse cx="250" cy="112" rx="6" ry="3" transform="rotate(-20 250 112)" fill="#33763D"/>
      </svg>

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          tag="El proceso"
          title="Así de"
          titleEm="sencillo."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 relative">
          {/* Línea conectora horizontal (solo desktop) */}
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-dorado/30" />

          {PASOS.map((paso, i) => (
            <div key={paso.num} className="relative flex flex-col items-center text-center px-8">
              {/* Número decorativo de fondo */}
              <div className="absolute -top-4 text-8xl font-serif font-light text-dorado/6 select-none pointer-events-none">
                {paso.num}
              </div>
              {/* Círculo numerado */}
              <div className="relative z-10 w-16 h-16 rounded-full border border-dorado/40 bg-crema flex items-center justify-center mb-6">
                <span className="font-serif text-dorado text-lg font-light">{i + 1}</span>
              </div>
              <h3 className="font-serif text-texto text-xl font-light mb-3">{paso.title}</h3>
              <p className="text-texto-muted text-sm font-light leading-relaxed">{paso.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}