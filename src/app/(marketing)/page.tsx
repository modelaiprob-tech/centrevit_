import { Hero } from '@/components/marketing/Hero'
import { BenefitsStrip } from '@/components/marketing/BenefitsStrip'
import { ServicesGrid } from '@/components/marketing/ServicesGrid'
import { MetodoCentrevit } from '@/components/marketing/MetodoCentrevit'
import { ComoFunciona } from '@/components/marketing/ComoFunciona'
import { SobreNosotros } from '@/components/marketing/SobreNosotros'
import { BookingCTA } from '@/components/marketing/BookingCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centro de Bienestar en Tudela | Tratamientos Centrevit',
  description: 'Centro de bienestar en Tudela: Tratamientos relajantes y terapias energéticas que te ayudan a recuperar tu equilibrio y bienestar.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsStrip />
      <ServicesGrid />
      <MetodoCentrevit />
      <ComoFunciona />
      <SobreNosotros />
      <BookingCTA />
    </>
  )
}