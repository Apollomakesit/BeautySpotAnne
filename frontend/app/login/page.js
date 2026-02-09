'use client'
import { useState, useRef, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, LogIn,
  Chrome, Facebook, Loader2
} from 'lucide-react'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError('Email sau parolă incorectă.')
      toast.error('Email sau parolă incorectă.')
    } else {
      toast.success('Autentificare reușită!')
      router.push(callbackUrl)
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-12 dot-pattern">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-rose/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-beauty-gold/8 rounded-full blur-[100px] -z-10" />
        <div className="container-beauty text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge mb-4 inline-flex">
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              Cont
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Intră în <span className="gradient-text">Cont</span>
            </h1>
            <p className="section-subheading">
              Conectează-te pentru a gestiona programările tale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Form */}
      <section className="section-padding bg-white">
        <div className="container-beauty max-w-md mx-auto">
          <Reveal>
            <div className="card">
              {/* Social Login */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={() => signIn('google', { callbackUrl })}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border-2 border-beauty-cream-dark hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02] transition-all duration-300 font-medium text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuă cu Google
                </button>
                <button
                  onClick={() => signIn('facebook', { callbackUrl })}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border-2 border-beauty-cream-dark hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02] transition-all duration-300 font-medium text-sm"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                  Continuă cu Facebook
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-beauty-cream-dark" />
                <span className="text-xs text-gray-400 font-medium">SAU</span>
                <div className="flex-1 h-px bg-beauty-cream-dark" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="maria@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-beauty !pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Parolă</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Parola ta"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-beauty !pl-11 !pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 !py-4 disabled:opacity-50"
                >
                  {loading ? 'Se conectează...' : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Conectează-te
                    </>
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="text-center mt-8 pt-6 border-t border-beauty-cream-dark/50">
                <p className="text-sm text-gray-500">
                  Nu ai un cont?{' '}
                  <Link href="/register" className="text-beauty-rose font-semibold hover:text-beauty-rose-dark transition-colors">
                    Creează Cont
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-beauty-rose animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
