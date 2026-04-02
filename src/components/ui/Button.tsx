import { cn } from '@/lib/utils' // lo crearás tú

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 rounded-sm',
        {
          'bg-dorado text-blanco hover:bg-dorado-claro': variant === 'primary',
          'border border-verde text-verde hover:bg-verde hover:text-blanco': variant === 'secondary',
          'text-texto-muted hover:text-texto': variant === 'ghost',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-sm': size === 'md',
          'px-8 py-4 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}