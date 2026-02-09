'use client'
import { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Sparkles,
  UserPlus, Facebook, Check, Crown, Heart
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

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password.length < 6) {
      setError('Parola trebuie sa aiba cel putin 6 caractere.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Parolele nu coincid.')
      return
    }

    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      await axios.post(`${apiUrl}/api/users/register`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password,
      })

      toast.success('Contul a fost creat cu succes!')

      // Auto-login after registration
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (result?.ok) {
        router.push('/')
        router.refresh()
      } else {
        router.push('/login')
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Eroare la crearea contului.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-fuchsia/8 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-beauty-rosegold/10 rounded-full blur-[100px] -z-10" />
        <div className="container-beauty text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge mb-4 inline-flex">
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Cont Nou
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Creeaza-ti <span className="gradient-text">Contul</span>
            </h1>
            <p className="section-subheading">
              Inregistreaza-te pentru a putea programa rapid si a primi oferte speciale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Register Form */}
      <section className="section-padding bg-white">
        <div className="container-beauty">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Left - decorative */}
            <div className="hidden lg:block">
              <Reveal>
                <div className="relative rounded-3xl overflow-hidden shadow-luxe h-[600px]">
                  <Image
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=face"
                    alt="Beauty experience"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-beauty-rose/40 via-transparent to-beauty-fuchsia/10" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-beauty-blush/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Crown className="w-6 h-6 text-beauty-rose" />
                        <span className="font-display font-bold text-lg">Beneficii Cont</span>
                      </div>
                      <ul className="space-y-2">
                        {['Programari rapide online', 'Oferte si reduceri exclusive', 'Istoric programari complet'].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-beauty-warm">
                            <Heart className="w-3.5 h-3.5 text-beauty-rose flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right - form */}
            <Reveal delay={0.1}>
              <div className="card border-beauty-blush/30">
                {/* Social Register */}
                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border-2 border-beauty-blush-soft hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02] transition-all duration-300 font-medium text-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Inregistrare cu Google
                  </button>
                  <button
                    onClick={() => signIn('facebook', { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border-2 border-beauty-blush-soft hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02] transition-all duration-300 font-medium text-sm"
                  >
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                    Inregistrare cu Facebook
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-beauty-blush-soft" />
                  <span className="text-xs text-beauty-warm font-medium">SAU CU EMAIL</span>
                  <div className="flex-1 h-px bg-beauty-blush-soft" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-beauty-charcoal mb-2">Prenume</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                        <input
                          type="text"
                          required
                          placeholder="Maria"
                          value={formData.first_name}
                          onChange={handleChange('first_name')}
                          className="input-beauty !pl-11"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-beauty-charcoal mb-2">Nume de Familie</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                        <input
                          type="text"
                          required
                          placeholder="Popescu"
                          value={formData.last_name}
                          onChange={handleChange('last_name')}
                          className="input-beauty !pl-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-beauty-charcoal mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                      <input
                        type="email"
                        required
                        placeholder="maria@email.com"
                        value={formData.email}
                        onChange={handleChange('email')}
                        className="input-beauty !pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-beauty-charcoal mb-2">Telefon</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                      <input
                        type="tel"
                        placeholder="0721 234 567"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        className="input-beauty !pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-beauty-charcoal mb-2">Parola</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Minim 6 caractere"
                        value={formData.password}
                        onChange={handleChange('password')}
                        className="input-beauty !pl-11 !pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-beauty-mauve hover:text-beauty-rose"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-beauty-charcoal mb-2">Confirma Parola</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Repeta parola"
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        className="input-beauty !pl-11"
                      />
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-sage" />
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 !py-4 disabled:opacity-50"
                  >
                    {loading ? 'Se creeaza contul...' : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Creeaza Cont
                      </>
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-8 pt-6 border-t border-beauty-blush-soft">
                  <p className="text-sm text-beauty-warm">
                    Ai deja un cont?{' '}
                    <Link href="/login" className="text-beauty-rose font-semibold hover:text-beauty-rose-dark transition-colors">
                      Conecteaza-te
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
