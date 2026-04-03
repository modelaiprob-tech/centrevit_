'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  },
  {
    name: 'Calendario',
    href: '/admin/calendario',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>,
  },
  {
    name: 'Reservas',
    href: '/admin/reservas',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 011.875 1.875v11.25a1.875 1.875 0 01-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V6.375c0-1.036.84-1.875 1.875-1.875z" /></svg>,
  },
  {
    name: 'Clientes',
    href: '/admin/clientes',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  },
  {
    name: 'Servicios',
    href: '/admin/servicios',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>,
  },
  {
    name: 'Estadísticas',
    href: '/admin/estadisticas',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  },
  {
    name: 'Caja',
    href: '/admin/caja',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>,
  },
]

const settingsIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar_collapsed')
    if (saved === 'true') setIsCollapsed(true)
  }, [])

  const toggleSidebar = () => {
    const next = !isCollapsed
    setIsCollapsed(next)
    localStorage.setItem('sidebar_collapsed', String(next))
  }

  const widthClass = isCollapsed ? 'w-12' : 'w-44'

  return (
    <aside className={`${widthClass} bg-verde-oscuro flex flex-col h-full text-blanco transition-all duration-300 shrink-0 z-20`}>

      {/* Logo */}
      {!isCollapsed && (
        <div className="pt-4 pb-3 border-b border-blanco/10 flex justify-center">
          <Image
            src="/logo.png"
            alt="Centrevit"
            width={56}
            height={56}
            className="w-14 h-14 object-contain brightness-0 invert"
            priority
          />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {/* Toggle — encima del primer ítem */}
        <button
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expandir' : 'Colapsar'}
          className="flex items-center justify-center w-full py-1 mb-1 text-blanco/25 hover:text-blanco/60 transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3.5 h-3.5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname === `${item.href}/`
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md font-sans text-sm transition-colors
                ${isActive
                  ? 'bg-blanco/10 text-blanco border-l-2 border-dorado'
                  : 'text-blanco/60 hover:text-blanco hover:bg-blanco/5 border-l-2 border-transparent'
                }
                ${isCollapsed ? 'justify-center border-l-0 px-0' : ''}
              `}
            >
              {item.icon}
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: settings + logout */}
      <div className="border-t border-blanco/10 px-2 py-3 flex flex-col gap-0.5">
        <Link
          href="/admin/settings"
          title={isCollapsed ? 'Settings' : undefined}
          className={`flex items-center py-2 text-sm rounded-md font-sans transition-colors w-full ${
            pathname === '/admin/settings'
              ? 'bg-blanco/10 text-blanco'
              : 'text-blanco/60 hover:text-blanco hover:bg-blanco/5'
          } ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'}`}
        >
          {settingsIcon}
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            title={isCollapsed ? 'Cerrar sesión' : undefined}
            className={`flex items-center py-2 text-sm text-blanco/60 hover:text-blanco hover:bg-blanco/5 rounded-md font-sans transition-colors w-full ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'}`}
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            {!isCollapsed && <span>Cerrar sesión</span>}
          </button>
        </form>
      </div>
    </aside>
  )
}
