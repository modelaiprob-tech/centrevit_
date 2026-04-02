import { SectionTitle } from '@/components/ui/SectionTitle'

const PILARES = [
  {
    num: '01',
    title: 'Identificación',
    description: 'Cada sesión comienza identificando el origen real del malestar, no solo los síntomas visibles.',
  },
  {
    num: '02',
    title: 'Preparación y relajación',
    description: 'Trabajamos el cuerpo para llevarlo a un estado de calma profunda antes de aplicar cualquier técnica.',
  },
  {
    num: '03',
    title: 'Aplicación terapéutica',
    description: 'Aplicamos las técnicas y tratamientos específicos adaptados a lo que tu cuerpo necesita en ese momento.',
  },
  {
    num: '04',
    title: 'Seguimiento',
    description: 'Monitorizamos tu evolución y ajustamos el tratamiento a medida que tu cuerpo responde.',
  },
]

export function MetodoCentrevit() {
  return (
    <section className="bg-crema py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          tag="Nuestra metodología"
          title="El Método"
          titleEm="Centrevit."
          subtitle="Un enfoque integral que combina diferentes terapias para tratarte como una persona completa, no como un síntoma aislado."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILARES.map((pilar) => (
            <div
              key={pilar.num}
              className="bg-blanco rounded-lg p-8 border border-crema-oscuro hover:border-verde-claro hover:-translate-y-1 transition-all duration-200"
            >
              <div className="font-serif text-5xl font-light text-dorado/20 mb-4 leading-none select-none">
                {pilar.num}
              </div>
              <h3 className="font-serif font-light text-xl text-texto mb-3">
                {pilar.title}
              </h3>
              <p className="text-texto-muted text-sm font-light leading-relaxed">
                {pilar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
