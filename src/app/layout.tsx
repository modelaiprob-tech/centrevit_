import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://centrevit.es'),
  title: {
    default: 'Centrevit | Centro de Bienestar en Tudela',
    template: '%s | Centrevit',
  },
  description: 'Centro de bienestar en Tudela. Tratamientos relajantes y terapias energéticas que te ayudan a recuperar tu equilibrio y bienestar.',
  openGraph: {
    siteName: 'Centrevit',
    locale: 'es_ES',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-crema text-texto antialiased">
        {children}
      </body>
    </html>
  )
}