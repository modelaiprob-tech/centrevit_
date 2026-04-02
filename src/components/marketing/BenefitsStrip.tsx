const BENEFITS = [
  {
    icon: '◈',
    title: 'Alivio de tensiones',
    description: 'Soltamos la carga muscular y reducimos el estrés acumulado.',
  },
  {
    icon: '◎',
    title: 'Equilibrio corporal',
    description: 'Regulación interna y mejora de la estabilidad física y energética.',
  },
  {
    icon: '◉',
    title: 'Circulación más activa',
    description: 'Estimulamos el flujo interno, aportando ligereza y vitalidad.',
  },
  {
    icon: '◌',
    title: 'Bienestar profundo',
    description: 'Combinamos relajación y energía para recuperar calma y descanso real.',
  },
]

export function BenefitsStrip() {
  return (
    <section className="bg-crema py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="group p-6 bg-blanco rounded border border-transparent hover:border-verde-claro hover:-translate-y-1 transition-all duration-200"
          >
            <div className="text-dorado text-2xl mb-4">{b.icon}</div>
            <h3 className="font-serif font-light text-xl text-texto mb-2">{b.title}</h3>
            <p className="text-texto-muted text-sm font-light leading-relaxed">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}