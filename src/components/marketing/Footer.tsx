import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-verde-oscuro text-blanco/70">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image src="/logo.png" alt="Centrevit" width={150} height={120} className="h-14 w-auto opacity-90 hover:opacity-100 transition-opacity" unoptimized />
          </Link>
        </div>

        {/* Línea dorada */}
        <div className="h-px bg-dorado/30 mb-12" />

        {/* Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h4 className="font-sans text-xs font-medium text-blanco/40 tracking-widest uppercase mb-4">
              Tratamientos
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/tratamientos/par-biomagnetico', label: 'Par Biomagnético' },
                { href: '/tratamientos/reflexologia-podal', label: 'Reflexología Podal' },
                { href: '/tratamientos/quiromasaje-integrador', label: 'Quiromasaje Integrador' },
                { href: '/tratamientos/presoterapia-ballancer', label: 'Presoterapia Ballancer' },
                { href: '/tratamientos/manta-fhos-led', label: 'Manta FHOS LED' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-dorado-claro transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-medium text-blanco/40 tracking-widest uppercase mb-4">
              Centrevit
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-dorado-claro transition-colors">Inicio</Link></li>
              <li><Link href="/centrevit" className="text-sm hover:text-dorado-claro transition-colors">Quiénes somos</Link></li>
              <li><Link href="/reservar" className="text-sm hover:text-dorado-claro transition-colors">Reservar cita</Link></li>
              <li><Link href="/contacto" className="text-sm hover:text-dorado-claro transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-medium text-blanco/40 tracking-widest uppercase mb-4">
              Contacto
            </h4>
            <address className="not-italic space-y-2 text-sm">
              <p>C. José Ramón Castro Álava, 41, 2ºA</p>
              <p>31500 Tudela, Navarra</p>
              <a href="tel:679417138" className="block hover:text-dorado-claro transition-colors">679 41 71 38</a>
              <a href="mailto:javierxy@hotmail.com" className="block hover:text-dorado-claro transition-colors">javierxy@hotmail.com</a>
              <div className="flex gap-4 pt-2">
                <a href="https://wa.me/34679417138" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Centrevit" className="text-blanco/70 hover:text-dorado-claro transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/people/Centrevit/61581214989298/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Centrevit" className="text-blanco/70 hover:text-dorado-claro transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/centrevit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Centrevit" className="text-blanco/70 hover:text-dorado-claro transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-blanco/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blanco/35">
          <p>© {new Date().getFullYear()} Centrevit. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/aviso-legal" className="hover:text-blanco/60 transition-colors">Aviso Legal</Link>
            <Link href="/politica-privacidad" className="hover:text-blanco/60 transition-colors">Privacidad</Link>
            <Link href="/politica-cookies" className="hover:text-blanco/60 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}