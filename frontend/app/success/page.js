'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Calendar, MessageCircle, Star, ArrowRight, Phone, Crown } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const whatsappUrl = searchParams.get('whatsapp')

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-fuchsia/8 rounded-full blur-[120px] -z-10" />

        <div className="container-beauty">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-beauty-sage/20 to-beauty-sage/10 flex items-center justify-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}>
                <CheckCircle2 className="w-14 h-14 text-beauty-sage" />
              </motion.div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Programare <span className="gradient-text">Confirmata!</span>
            </h1>
            <p className="text-beauty-warm text-lg mb-8 max-w-lg mx-auto">
              Plata avansului a fost procesata cu succes. Vei primi o confirmare pe WhatsApp si email.
            </p>

            {/* WhatsApp Confirmation */}
            {whatsappUrl && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-white rounded-3xl shadow-beauty-lg p-8 mb-8 border border-beauty-blush/30">
                <MessageCircle className="w-10 h-10 text-[#25D366] mx-auto mb-4" />
                <h2 className="font-display font-bold text-xl mb-2">Confirmare WhatsApp</h2>
                <p className="text-beauty-warm text-sm mb-6">
                  Apasa butonul de mai jos pentru a primi detaliile programarii pe WhatsApp:
                </p>
                <a href={decodeURIComponent(whatsappUrl)} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 text-lg">
                  <MessageCircle className="w-5 h-5" /> Primeste pe WhatsApp
                </a>
              </motion.div>
            )}

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="card !p-6 text-left">
                <Calendar className="w-6 h-6 text-beauty-rose mb-3" />
                <h3 className="font-semibold mb-1">Ce urmeaza?</h3>
                <p className="text-beauty-warm text-sm">Vino la salon la data si ora programata. Restul sumei se plateste la salon.</p>
              </div>
              <div className="card !p-6 text-left">
                <Phone className="w-6 h-6 text-beauty-rose mb-3" />
                <h3 className="font-semibold mb-1">Ai intrebari?</h3>
                <p className="text-beauty-warm text-sm">Suna la 0760 089 809 sau scrie pe WhatsApp. Suntem aici pentru tine!</p>
              </div>
            </div>

            {/* Google Review CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-beauty-rose-light/50 to-beauty-blush-soft/50 rounded-3xl p-8 border border-beauty-blush/30 mb-8">
              <Star className="w-8 h-8 text-beauty-rose mx-auto mb-3" />
              <h3 className="font-display font-bold text-xl mb-2">Ai mai fost la noi?</h3>
              <p className="text-beauty-warm text-sm mb-5">Lasa-ne o recenzie pe Google - ne ajuta sa crestem si sa oferim servicii si mai bune!</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://g.page/r/beautyspotanne/review" target="_blank" rel="noopener noreferrer"
                  className="btn-gold flex items-center gap-2 !py-2.5 !px-5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Recenzie Google
                </a>
                <Link href="/recenzii" className="btn-secondary !py-2.5 !px-5 flex items-center gap-2">
                  Recenzie pe Site <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <Crown className="w-4 h-4" /> Inapoi la Pagina Principala
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-beauty-cream">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-beauty-rose border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-beauty-warm text-sm">Se incarca...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
