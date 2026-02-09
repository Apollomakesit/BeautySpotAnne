'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion, useInView } from 'framer-motion'
import { 
  Sparkles, Star, Clock, ArrowRight, Shield, Award, Heart,
  ChevronRight, Phone, Calendar, CheckCircle2, Gem, Quote
} from 'lucide-react'
import {
  LUXURY_PHOTOS,
  HOME_SERVICE_HIGHLIGHTS,
  PORTFOLIO_IMAGES,
} from './luxuryThemeData'

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
  const [reviews, setReviews] = useState([])
  const BOOKING_STEPS = [
    {
      title: 'Alege serviciul ideal',
      description: 'Selectezi tratamentul potrivit stilului si formei ochilor tai.',
      icon: Sparkles,
    },
    {
      title: 'Rezervi data si ora',
      description: 'Vezi intervalele disponibile in timp real si confirmi programarea.',
      icon: Calendar,
    },
    {
      title: 'Confirmare premium',
      description: 'Primesti confirmarea imediat si te asteptam intr-un ambient elegant.',
      icon: Gem,
    },
  ]

  const FALLBACK_REVIEWS = [
    { id: 1, client_name: 'Maria D.', text: 'Cele mai frumoase extensii pe care le-am avut vreodată! Anne este incredibil de talentată și atentă la detalii.', rating: 5 },
    { id: 2, client_name: 'Alexandra P.', text: 'Atmosfera este superbă, totul este igienic și profesional. Merg de peste un an și sunt mereu încântată!', rating: 5 },
    { id: 3, client_name: 'Ioana M.', text: 'Lash lift-ul a fost exact ce-mi doream! Un look natural dar WOW. Super recomand!', rating: 5 },
  ]

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) return
    axios.get(`${apiUrl}/api/reviews/`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setReviews(res.data.slice(0, 3))
        }
      })
      .catch(() => {})
  }, [])

  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS
  return (
    <div className="overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[100vh] flex items-center dot-pattern">
        <div className="absolute top-16 right-0 w-[560px] h-[560px] bg-beauty-rose/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[460px] h-[460px] bg-beauty-gold/10 rounded-full blur-[100px] -z-10" />

        <div className="container-beauty w-full pt-32 pb-20 lg:pt-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="badge mb-6">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Beauty Lounge Premium in Bucuresti
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.08] mb-6">
                Luxul Privirii
                <br />
                <span className="gradient-text">Feminin. Elegant. Profesional.</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-10">
                Transformam fiecare programare intr-o experienta premium: extensii de gene,
                lash lift si consultanta personalizata intr-un decor roz rafinat, inspirat
                de estetica luxoasa a studiourilor moderne.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/booking" className="btn-primary flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4" />
                  Programeaza-te Acum
                </Link>
                <Link href="/servicii" className="btn-secondary flex items-center gap-2 text-base">
                  Vezi Serviciile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-10">
                {[
                  { label: 'Cliente multumite', value: '500+' },
                  { label: 'Rating mediu', value: '5.0' },
                  { label: 'Ani experienta', value: '5+' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/80 backdrop-blur-sm border border-beauty-cream-dark/70 px-4 py-3 shadow-beauty">
                    <p className="text-2xl font-display font-bold text-beauty-rose">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-beauty-cream-dark/70">
                {[
                  { icon: Award, text: 'Tehnician Certificat' },
                  { icon: Shield, text: 'Produse premium, sterile' },
                  { icon: Heart, text: 'Design personalizat pentru fiecare clienta' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-gray-500">
                    <item.icon className="w-4 h-4 text-beauty-gold" />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] max-w-xl mx-auto">
                <div className="absolute -inset-6 bg-gradient-to-br from-beauty-rose/20 to-beauty-gold/20 rounded-[3rem] blur-3xl" />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-beauty-xl ring-1 ring-white/80">
                  <Image
                    src={LUXURY_PHOTOS.heroMain.src}
                    alt={LUXURY_PHOTOS.heroMain.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>

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
                    <p className="text-xs text-gray-500">Experienta premium garantata</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-8 top-12 bg-white rounded-2xl shadow-beauty-lg p-4 z-10"
                >
                  <p className="text-2xl font-display font-bold text-beauty-rose">24h</p>
                  <p className="text-xs text-gray-500">Confirmare rapida</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SIGNATURE EXPERIENCE ═══════ */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-beauty-cream via-white to-beauty-cream/70 -z-10" />
        <div className="container-beauty">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="badge-gold mb-4 inline-flex">Signature Experience</span>
                <h2 className="section-heading mb-4">Salon feminin cu estetica luxoasa in nuante de roz</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Conceptul nostru combina igiena impecabila, tehnici moderne si styling personalizat.
                  Fiecare sedinta este gandita pentru confort, rezultate fotogenice si un look profesional.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Consultatie personalizata pentru forma ochilor',
                    'Produse premium, potrivite si pentru piele sensibila',
                    'Protocol de lucru steril si atent la fiecare detaliu',
                    'Recomandari post-tratament pentru rezistenta maxima',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-beauty-rose flex-shrink-0" />
                      <p className="text-gray-600">{point}</p>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                  Discutam despre look-ul tau
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-beauty-xl">
                <Image
                  src={LUXURY_PHOTOS.studio.src}
                  alt={LUXURY_PHOTOS.studio.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                <div className="absolute left-6 bottom-6 right-6 bg-white/85 backdrop-blur-sm rounded-2xl p-4 border border-white/60">
                  <p className="text-sm font-semibold text-beauty-charcoal">Ambianta premium & confort total</p>
                  <p className="text-xs text-gray-500 mt-1">Timpul tau de beauty devine timp de relaxare.</p>
                </div>
              </div>
            </Reveal>
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
            <h2 className="section-heading">Servicii Signature</h2>
            <p className="section-subheading">
              Tratamente realizate cu produse profesionale si tehnici moderne pentru un rezultat elegant
            </p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOME_SERVICE_HIGHLIGHTS.map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="card-interactive group h-full flex flex-col">
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 26vw, (min-width: 768px) 40vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-beauty-charcoal">
                      Aspect premium
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
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

      {/* ═══════ BOOKING FLOW ═══════ */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-beauty-cream via-white to-beauty-cream -z-10" />

        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex">Functionalitate imbunatatita</span>
            <h2 className="section-heading">Programare simpla in 3 pasi</h2>
            <p className="section-subheading">
              Flux rapid, intuitiv si optimizat pentru conversie
            </p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {BOOKING_STEPS.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="card h-full text-center group">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-beauty-rose/10 to-beauty-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-7 h-7 text-beauty-rose" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="card-glass bg-gradient-to-r from-beauty-rose/8 to-beauty-gold/10 flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="font-display font-bold text-2xl">Zero stres, doar rezultate superbe</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Confirmare rapida, plata avans securizata si suport direct pe WhatsApp/telefon.
                </p>
              </div>
              <Link href="/booking" className="btn-primary whitespace-nowrap flex items-center gap-2">
                Incepe Programarea
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
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
            {displayReviews.map((review, idx) => (
              <Reveal key={review.id || idx} delay={idx * 0.15}>
                <div className="card h-full flex flex-col">
                  <Quote className="w-8 h-8 text-beauty-rose/20 mb-2" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(Math.max(1, Math.min(5, Number(review.rating) || 5)))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-beauty-gold fill-beauty-gold" />
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed italic flex-1 mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-beauty-cream-dark/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-beauty-rose/20 to-beauty-gold/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-beauty-rose">
                        {review.client_name?.charAt(0) || 'C'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.client_name || 'Clienta BeautySpot'}</p>
                      <p className="text-xs text-gray-400">Clientă verificată</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-10">
            <Link href="/recenzii" className="btn-secondary inline-flex items-center gap-2">
              Vezi Toate Recenziile
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════ PORTFOLIO ═══════ */}
      <section className="section-padding relative">
        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Portfolio Profesional
            </span>
            <h2 className="section-heading">Rezultate care vorbesc de la sine</h2>
            <p className="section-subheading">
              Imagini cu estetica editoriala, inspirate din lumea beauty premium
            </p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PORTFOLIO_IMAGES.map((image, i) => (
              <Reveal key={image.src} delay={(i % 3) * 0.1}>
                <a
                  href="https://instagram.com/beautyspotanne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-beauty hover:shadow-beauty-lg transition-all duration-500"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(min-width: 768px) 30vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute left-4 bottom-4 right-4 text-white">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">BeautySpot</p>
                    <p className="text-sm font-semibold">Luxury Pink Editorial Look</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={LUXURY_PHOTOS.cta.src}
            alt={LUXURY_PHOTOS.cta.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-beauty-rose/90 via-beauty-rose-dark/85 to-beauty-warm/90" />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-15 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-beauty-gold/20 rounded-full blur-[60px]" />

        <div className="container-beauty relative text-center">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                Pregatita sa stralucesti?
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Rezerva experienta ta
                <br />
                Luxury Pink Beauty
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
                Programarea online dureaza mai putin de 2 minute, iar echipa noastra
                se ocupa de restul pentru un rezultat impecabil.
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
                  Suna-ne
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
