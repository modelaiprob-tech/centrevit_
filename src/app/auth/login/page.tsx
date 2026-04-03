'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Credenciales incorrectas')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-crema flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-blanco rounded-xl shadow-md p-8">

        {/* Logo prominente */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Centrevit"
            width={120}
            height={120}
            className="w-24 h-24 object-contain"
            priority
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="font-serif text-2xl text-texto">Acceso al panel</h1>
          <p className="font-sans text-sm text-texto-muted mt-1">Solo personal autorizado</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 font-sans">
          <div>
            <label className="block text-sm font-medium text-texto mb-1 text-left">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-crema/40 border border-crema-oscuro rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-texto mb-1 text-left">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-crema/40 border border-crema-oscuro rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 focus:border-verde"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-verde text-blanco hover:bg-verde-medio py-2.5 rounded-md text-sm font-medium transition-colors mt-2 disabled:opacity-70"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-md">
              {error}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs font-sans text-texto-muted">
          Centro de Bienestar · Tudela
        </p>
      </div>
    </div>
  )
}
