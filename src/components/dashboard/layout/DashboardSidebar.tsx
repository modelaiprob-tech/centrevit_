'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Vista general', href: '/admin' },
  { name: 'Calendario', href: '/admin/calendario' },
  { name: 'Reservas', href: '/admin/reservas' },
  { name: 'Clientes', href: '/admin/clientes' },
  { name: 'Servicios', href: '/admin/servicios' },
  { name: 'Estadísticas', href: '/admin/estadisticas' },
  { name: 'Caja', href: '/admin/caja' },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-verde-oscuro flex flex-col h-full text-blanco">
      <div className="p-6 border-b border-blanco/10">
        <Image src="/logo.png" alt="Centrevit" width={150} height={40} className="w-auto h-auto object-contain brightness-0 invert" priority />
      </div>
      <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-sans text-sm transition-colors ${isActive ? 'bg-blanco/10 text-blanco border-l-2 border-dorado' : 'text-blanco/60 hover:text-blanco hover:bg-blanco/5 border-l-2 border-transparent'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-blanco/10">
        <form action="/auth/signout" method="post">
          <button type="submit" className="w-full text-left px-3 py-2 text-sm text-blanco/60 hover:text-blanco hover:bg-blanco/5 rounded-md font-sans">
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}
