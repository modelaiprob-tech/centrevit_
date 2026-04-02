import { cn } from '@/lib/utils' // lo crearás tú

type SectionTitleProps = {
  tag?: string
  title: string
  titleEm?: string  // palabra en cursiva dentro del título
  subtitle?: string
  centered?: boolean
  light?: boolean   // para secciones oscuras
}

export function SectionTitle({ tag, title, titleEm, subtitle, centered, light }: SectionTitleProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center')}>
      {tag && (
        <div className={cn(
          'flex items-center gap-3 mb-4 text-xs font-medium tracking-widest uppercase',
          centered && 'justify-center',
          light ? 'text-dorado-claro' : 'text-dorado'
        )}>
          <span className={cn('h-px w-8', light ? 'bg-dorado-claro' : 'bg-dorado')} />
          {tag}
        </div>
      )}
      <h2 className={cn(
        'font-serif font-light leading-tight',
        'text-4xl md:text-5xl lg:text-6xl',
        light ? 'text-blanco' : 'text-texto'
      )}>
        {title}
        {titleEm && <em className="italic"> {titleEm}</em>}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-base font-light leading-relaxed max-w-2xl',
          centered && 'mx-auto',
          light ? 'text-blanco/65' : 'text-texto-muted'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}