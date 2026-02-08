'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Sparkles, Star, Clock, ArrowRight, Shield, Award, Heart, 
  ChevronRight, Instagram, Phone, Calendar, Eye 
} from 'lucide-react'

/* ───── Scroll‑reveal wrapper ───── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────── */
export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[100vh] flex items-center dot-pattern">
        {/* Gradient blobs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-beauty-rose/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-beauty-gold/10 rounded-full blur-[100px] -z-10" />

        <div className="container-beauty w-full pt-32 pb-20 lg:pt-0 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="badge mb-6">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Salon Premium în București
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
                Privirea Ta{' '}
                <span className="relative">
                  <span className="gradient-text">Perfectă</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 C50 2, 150 2, 198 8" stroke="#D4A5A5" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <br />
                Începe Aici
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed max-w-lg mb-10">
                Extensii de gene profesionale, lash lift și tratamente beauty 
                personalizate. Descoperă frumusețea naturală, amplificată cu pasiune 
                și măiestrie.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/booking" className="btn-primary flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4" />
                  Programează‑te Acum
                </Link>
                <Link href="/servicii" className="btn-secondary flex items-center gap-2 text-base">
                  Vezi Serviciile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-beauty-cream-dark/60">
                {[
                  { icon: Star, text: '500+ Cliente Fericite' },
                  { icon: Award, text: '5+ Ani Experiență' },
                  { icon: Shield, text: 'Produse Premium' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <badge.icon className="w-4 h-4 text-beauty-gold" />
                    {badge.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right – hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">
                {/* Main image placeholder */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-beauty-rose/30 via-beauty-blush/20 to-beauty-gold/20 shadow-beauty-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye className="w-16 h-16 text-beauty-rose/40" />
                  </div>
                </div>

                {/* Floating card – reviews */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-8 bottom-24 bg-white rounded-2xl shadow-beauty-lg p-4 flex items-center gap-3 z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-beauty-gold/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-beauty-gold fill-beauty-gold" />
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-beauty-gold fill-beauty-gold" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">500+ recenzii</p>
                  </div>
                </motion.div>

                {/* Floating card – experience */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-6 top-16 bg-white rounded-2xl shadow-beauty-lg p-4 z-10"
                >
                  <p className="text-2xl font-display font-bold text-beauty-rose">5+</p>
                  <p className="text-xs text-gray-500">Ani experiență</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES SHOWCASE ═══════ */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beauty-cream-dark to-transparent" />
        
        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge-gold mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Servicii Premium
            </span>
            <h2 className="section-heading">Serviciile Noastre</h2>
            <p className="section-subheading">
              Fiecare tratament este personalizat pentru a scoate în evidență 
              frumusețea ta naturală
            </p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                name: 'Extensii Gene Classic',
                desc: 'Aspect natural și elegant, ideal pentru un look de zi cu zi rafinat.',
                price: '250',
                duration: '2h',
                color: 'from-beauty-rose/10 to-beauty-blush/10',
              },
              {
                icon: Sparkles,
                name: 'Volume 2D‑3D',
                desc: 'Volum controlat, perfect pentru un efect dramatic dar sofisticat.',
                price: '300',
                duration: '2.5h',
                color: 'from-beauty-gold/10 to-beauty-rose/10',
              },
              {
                icon: Heart,
                name: 'Lash Lift & Tint',
                desc: 'Gene naturale curbate și colorate, fără extensii. Efect WOW instant.',
                price: '180',
                duration: '1h',
                color: 'from-beauty-sage/10 to-beauty-cream-dark/30',
              },
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="card-interactive group h-full flex flex-col">
                  {/* Gradient header */}
                  <div className={`h-48 rounded-2xl bg-gradient-to-br ${service.color} mb-6 flex items-center justify-center relative overflow-hidden`}>
                    <service.icon className="w-12 h-12 text-beauty-rose/40 group-hover:scale-110 transition-transform duration-500" />
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gold-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%' }} />
                  </div>

                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-beauty-cream-dark/50">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {service.duration}
                      </span>
                    </div>
                    <span className="text-xl font-display font-bold text-beauty-rose">
                      {service.price} <span className="text-sm font-body font-normal text-gray-400">RON</span>
                    </span>
                  </div>

                  <Link
                    href="/booking"
                    className="btn-primary w-full text-center mt-6 flex items-center justify-center gap-2"
                  >
                    Rezervă Acum
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/servicii" className="btn-secondary inline-flex items-center gap-2">
              Vezi Toate Serviciile
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-beauty-cream via-white to-beauty-cream -z-10" />
        
        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex">De Ce Noi?</span>
            <h2 className="section-heading">Experiența BeautySpot</h2>
            <p className="section-subheading">
              Ne dedicăm excelenței în fiecare detaliu
            </p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Certificată Premium',
                desc: 'Tehnici avansate și certificări internaționale.',
              },
              {
                icon: Shield,
                title: 'Produse de Top',
                desc: 'Doar materiale premium, hipoalergenice și sigure.',
              },
              {
                icon: Heart,
                title: 'Abordare Personalizată',
                desc: 'Fiecare tratament adaptat formei ochilor tăi.',
              },
              {
                icon: Star,
                title: 'Atmosferă Relaxantă',
                desc: 'Spațiu intim și confortabil, creat doar pentru tine.',
              },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="text-center p-8 rounded-3xl hover:bg-white hover:shadow-beauty transition-all duration-500 group">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-beauty-rose/10 to-beauty-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-7 h-7 text-beauty-rose" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beauty-cream-dark to-transparent" />
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-beauty-rose/5 rounded-full blur-[100px]" />

        <div className="container-beauty relative">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Recenzii
            </span>
            <h2 className="section-heading">Ce Spun Clientele</h2>
            <p className="section-subheading">
              Peste 500 de cliente fericite ne recomandă
            </p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria D.',
                text: 'Cele mai frumoase extensii pe care le-am avut vreodată! Anne este incredibil de talentată și atentă la detalii.',
                rating: 5,
              },
              {
                name: 'Alexandra P.',
                text: 'Atmosfera este superbă, totul este igienic și profesional. Merg de peste un an și sunt mereu încântată!',
                rating: 5,
              },
              {
                name: 'Ioana M.',
                text: 'Lash lift-ul a fost exact ce-mi doream! Un look natural dar WOW. Super recomand!',
                rating: 5,
              },
            ].map((review, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="card h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-beauty-gold fill-beauty-gold" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed italic flex-1 mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-beauty-cream-dark/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-beauty-rose/20 to-beauty-gold/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-beauty-rose">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-gray-400">Clientă verificată</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ INSTAGRAM GALLERY ═══════ */}
      <section className="section-padding relative">
        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex">
              <Instagram className="w-3.5 h-3.5 mr-1.5" />
              Instagram
            </span>
            <h2 className="section-heading">@beautyspotanne</h2>
            <p className="section-subheading">
              Urmărește-ne pentru inspirație și rezultate reale
            </p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Reveal key={i} delay={(i % 4) * 0.1}>
                <a
                  href="https://instagram.com/beautyspotanne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-beauty-rose/20 via-beauty-blush/10 to-beauty-gold/20"
                >
                  <div className="absolute inset-0 bg-beauty-charcoal/0 group-hover:bg-beauty-charcoal/40 flex items-center justify-center transition-all duration-500">
                    <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-beauty-rose via-beauty-rose-dark to-beauty-warm -z-10" />
        <div className="absolute inset-0 dot-pattern opacity-10 -z-10" />
        
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-beauty-gold/20 rounded-full blur-[60px]" />

        <div className="container-beauty relative text-center">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                Pregătită să strălucești?
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Programează-ți Transformarea
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
                Alege data potrivită și lasă-ne pe noi să te facem să strălucești. 
                Programare online rapidă și simplă.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/booking"
                  className="bg-white text-beauty-rose hover:bg-beauty-cream font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Programare Online
                </Link>
                <a
                  href="tel:+40XXXXXXXXX"
                  className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold py-4 px-10 rounded-full transition-all duration-300 flex items-center gap-2 text-lg"
                >
                  <Phone className="w-5 h-5" />
                  Sună‑ne
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
