export type ServicioPaso = {
  num: string
  title: string
  description: string
}

export type ServicioBeneficioDetalle = {
  icono: string
  titulo: string
  descripcion: string
}

export type Servicio = {
  slug: string
  nombre: string
  subtitulo: string
  descripcion: string
  paraQuien: string
  beneficios: string[]
  duracion: number
  // Campos opcionales para la página de detalle enriquecida
  introTexto?: string
  paraQuienItems?: string[]
  sesionPasos?: ServicioPaso[]
  beneficiosDetalle?: ServicioBeneficioDetalle[]
}

export const SERVICIOS: Servicio[] = [
  {
    slug: 'par-biomagnetico',
    nombre: 'Par Biomagnético',
    subtitulo: 'Equilibrio energético',
    descripcion: 'Tratamiento con imanes que ayuda a equilibrar el cuerpo, reducir inflamación y mejorar la energía de forma natural.',
    paraQuien: 'Cansancio, inflamación, digestiones pesadas, tensión acumulada.',
    beneficios: [
      'Regula el equilibrio interno del pH corporal',
      'Disminuye la inflamación en puntos concretos',
      'Recupera la vitalidad y reduce el cansancio',
      'No invasivo — solo imanes, sin dolor',
    ],
    duracion: 60,
  },
  {
    slug: 'reflexologia-podal',
    nombre: 'Reflexología Podal',
    subtitulo: 'Estimulación natural',
    descripcion: 'Presión en puntos del pie que liberan tensión, mejoran la circulación y ayudan a regular el sistema nervioso.',
    paraQuien: 'Estrés, insomnio, tensión muscular, sensibilidad nerviosa.',
    beneficios: [
      'Libera bloqueos y tensiones acumuladas',
      'Mejora la circulación y el flujo interno',
      'Regula el sistema nervioso',
      'Activa los procesos naturales de recuperación',
    ],
    duracion: 60,
    introTexto: 'La Reflexología Podal es una terapia natural basada en la estimulación de puntos reflejos ubicados en los pies, que se corresponden con órganos, glándulas y sistemas del cuerpo. A través de una presión precisa y controlada, se trabaja el cuerpo de forma integral sin necesidad de intervención directa sobre la zona afectada.',
    paraQuienItems: [
      'Estrés y ansiedad acumulados',
      'Insomnio y dificultad para descansar',
      'Tensión muscular crónica',
      'Sensibilidad nerviosa elevada',
      'Cansancio sin causa aparente',
      'Desequilibrios hormonales',
    ],
    sesionPasos: [
      {
        num: '01',
        title: 'Evaluación inicial',
        description: 'Antes de comenzar observamos el estado de los pies e identificamos las zonas de mayor tensión o sensibilidad.',
      },
      {
        num: '02',
        title: 'Estimulación de puntos reflejos',
        description: 'Aplicamos presión suave y sostenida sobre los puntos clave, trabajando de forma progresiva y adaptada a tu estado.',
      },
      {
        num: '03',
        title: 'Cierre y integración',
        description: 'Terminamos con maniobras suaves para asentar el tratamiento y dejarte en un estado de calma profunda.',
      },
    ],
    beneficiosDetalle: [
      {
        icono: '◎',
        titulo: 'Libera bloqueos y tensiones',
        descripcion: 'La presión en los puntos reflejos disuelve las tensiones acumuladas en el sistema nervioso y muscular.',
      },
      {
        icono: '◈',
        titulo: 'Mejora la circulación',
        descripcion: 'Estimula el flujo sanguíneo y linfático, aportando mayor vitalidad y ligereza al cuerpo.',
      },
      {
        icono: '◉',
        titulo: 'Regula el sistema nervioso',
        descripcion: 'Actúa directamente sobre el sistema nervioso autónomo, reduciendo el estrés y promoviendo el equilibrio.',
      },
      {
        icono: '◌',
        titulo: 'Activa la recuperación natural',
        descripcion: 'El cuerpo activa sus propios mecanismos de regeneración, facilitando una recuperación más profunda y duradera.',
      },
    ],
  },
  {
    slug: 'quiromasaje-integrador',
    nombre: 'Quiromasaje Integrador',
    subtitulo: 'Liberación muscular',
    descripcion: 'Masaje manual profundo para soltar tensión muscular, mejorar la movilidad y aliviar molestias del día a día.',
    paraQuien: 'Tensión en cuello, hombros o espalda, sobrecarga, malas posturas.',
    beneficios: [
      'Alivia la tensión muscular acumulada',
      'Mejora la movilidad articular',
      'Activa la circulación sanguínea',
      'Genera bienestar que se mantiene tras la sesión',
    ],
    duracion: 60,
  },
  {
    slug: 'presoterapia-ballancer',
    nombre: 'Presoterapia Ballancer',
    subtitulo: 'Drenaje y ligereza',
    descripcion: 'Compresión secuencial que drena líquidos, alivia piernas cansadas y genera una sensación inmediata de ligereza.',
    paraQuien: 'Retención de líquidos, piernas pesadas, mala circulación.',
    beneficios: [
      'Reduce la retención de líquidos',
      'Mejora la circulación venosa y linfática',
      'Aporta sensación inmediata de ligereza',
      'Favorece la eliminación de toxinas',
    ],
    duracion: 45,
  },
  {
    slug: 'manta-fhos-led',
    nombre: 'Manta FHOS LED',
    subtitulo: 'Regeneración celular',
    descripcion: 'Fototerapia avanzada que aporta calor, relaja el cuerpo y estimula la regeneración y la vitalidad desde dentro.',
    paraQuien: 'Recuperación, relajación profunda, regeneración celular.',
    beneficios: [
      'Estimula la regeneración celular',
      'Aporta calor profundo y relajación total',
      'Mejora la vitalidad general',
      'Compatible con otros tratamientos',
    ],
    duracion: 30,
  },
]
