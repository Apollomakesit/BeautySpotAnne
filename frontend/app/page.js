'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles, Star, Clock, ArrowRight, Shield, Award, Heart,
  ChevronRight, Instagram, Phone, Calendar, Crown,
  Gem, Flower2, CheckCircle2, MessageCircle
} from 'lucide-react'
import { getServiceMeta } from '@/data/serviceCatalog'

/* ───── Scroll-reveal wrapper ───── */
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

const getServicePhoto = (name, fallback) => getServiceMeta(name)?.image_url || fallback

/* ─── Professional Photos matching the fixed services ─── */
const PHOTOS = {
  hero: getServicePhoto('3D', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&h=1500&q=80'),
  lash1D: getServicePhoto('1D', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&h=800&q=80'),
  lash2D: getServicePhoto('2D', 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?auto=format&fit=crop&w=1200&h=800&q=80'),
  lash3D: getServicePhoto('3D', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&h=800&q=80'),
  lash4D: getServicePhoto('4D', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=800&q=80'),
  whispy: getServicePhoto('Whispy volume', 'https://images.unsplash.com/photo-1588514912908-8e32e4b43b1c?auto=format&fit=crop&w=1200&h=800&q=80'),
  russian: getServicePhoto('Russian volume', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&h=800&q=80'),
  mega: getServicePhoto('Mega volume', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&h=800&q=80'),
  combi: getServicePhoto('Combi NC', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&h=800&q=80'),
  foxy: getServicePhoto('Foxy eyeliner', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=800&q=80'),
  pensat: getServicePhoto('Pensat', 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&w=1200&h=800&q=80'),
  gallery: [
    getServicePhoto('1D', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('2D', 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('3D', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('4D', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('Whispy volume', 'https://images.unsplash.com/photo-1588514912908-8e32e4b43b1c?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('Russian volume', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('Mega volume', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('Combi NC', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('Foxy eyeliner', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&h=800&q=80'),
    getServicePhoto('Pensat', 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&w=800&h=800&q=80'),
  ],
}

/* ─────────────────────────────────── */
export default function Home() {
  const [reviews, setReviews] = useState([])

  const FALLBACK_REVIEWS = [
    { id: 1, client_name: 'Maria D.', text: 'Cele mai frumoase extensii pe care le-am avut vreodata! Anne este incredibil de talentata si atenta la detalii.', rating: 5 },
    { id: 2, client_name: 'Alexandra P.', text: 'Atmosfera este superba, totul este igienic si profesional. Merg de peste un an si sunt mereu incantata!', rating: 5 },
    { id: 3, client_name: 'Ioana M.', text: 'Extensiile Russian Volume sunt absolut superbe! Recomand cu incredere!', rating: 5 },
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
      <section className="relative min-h-[100vh] flex items-center">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern -z-10 opacity-50" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-beauty-fuchsia/8 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-beauty-rosegold/10 rounded-full blur-[100px] -z-10" />

        <div className="container-beauty w-full pt-32 pb-20 lg:pt-0 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="badge mb-6">
                <Crown className="w-3.5 h-3.5 mr-1.5" />
                Extensii Gene Premium - Bucuresti
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
                Privirea Ta{' '}
                <span className="relative">
                  <span className="gradient-text">Perfecta</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 C50 2, 150 2, 198 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E8788A" />
                        <stop offset="50%" stopColor="#E84A8A" />
                        <stop offset="100%" stopColor="#E8B4B8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />
                <span className="text-beauty-charcoal">Incepe Aici</span>
              </h1>

              <p className="text-lg text-beauty-warm leading-relaxed max-w-lg mb-10">
                Extensii de gene profesionale de la 1D pana la 4D,
                plus Whispy volume, Russian volume si Mega volume. Descopera frumusetea amplificata
                cu pasiune si maiestrie.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/booking" className="btn-primary flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4" />
                  Programeaza-te Acum
                </Link>
                <a href="https://wa.me/40760089809?text=Buna%20ziua!%20As%20dori%20sa%20fac%20o%20programare." target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 text-base">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-beauty-blush/60">
                {[
                  { icon: Star, text: '500+ Cliente Fericite' },
                  { icon: Award, text: 'Experienta & Pasiune' },
                  { icon: Shield, text: 'Produse Premium' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-beauty-warm">
                    <badge.icon className="w-4 h-4 text-beauty-rose" />
                    {badge.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-luxe border-2 border-beauty-blush/40">
                  <Image src={PHOTOS.hero} alt="Extensii gene profesionale BeautySpot Anne" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-beauty-rose/20 via-transparent to-beauty-fuchsia/5" />
                </div>
                <div className="absolute -inset-3 rounded-[3rem] border-2 border-beauty-rose/20 -z-10" />

                {/* Floating card - reviews */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-8 bottom-24 bg-white/95 backdrop-blur-sm rounded-2xl shadow-beauty-lg p-4 flex items-center gap-3 z-10 border border-beauty-blush/30">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-beauty-rose/15 to-beauty-fuchsia/15 flex items-center justify-center">
                    <Star className="w-5 h-5 text-beauty-rose fill-beauty-rose" />
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (<Star key={i} className="w-3 h-3 text-beauty-rose fill-beauty-rose" />))}
                    </div>
                    <p className="text-xs text-beauty-warm">500+ recenzii</p>
                  </div>
                </motion.div>

                {/* Floating card - price */}
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-6 top-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-beauty-lg p-4 z-10 border border-beauty-blush/30">
                  <p className="text-sm font-medium text-beauty-warm">De la</p>
                  <p className="text-2xl font-display font-bold gradient-text">130 lei</p>
                </motion.div>

                <motion.div animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-8 bottom-12 w-14 h-14 bg-gradient-to-br from-beauty-rose to-beauty-fuchsia rounded-2xl shadow-pink-glow flex items-center justify-center z-10">
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES SHOWCASE ═══════ */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beauty-blush to-transparent" />
        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge-gold mb-4 inline-flex"><Sparkles className="w-3.5 h-3.5 mr-1.5" />Servicii Populare</span>
            <h2 className="section-heading">Extensii Gene & Sprancene</h2>
            <p className="section-subheading">Catalogul actualizat cu cele 14 servicii fixe, exact ca in meniu</p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: '1D', desc: 'Extensii clasice 1D cu efect curat si natural, aplicate fir cu fir.', price: '130', duration: '1.5h', photo: PHOTOS.lash1D },
              { name: '2D', desc: 'Volum 2D echilibrat, ideal pentru densitate vizibila si aspect elegant.', price: '150', duration: '1h 40m', photo: PHOTOS.lash2D },
              { name: '3D', desc: 'Volum 3D bine definit, cu efect glam si pastrare a confortului.', price: '170', duration: '2h', photo: PHOTOS.lash3D },
              { name: '4D', desc: 'Volum 4D intens, pentru un efect dramatic si ochi foarte expresivi.', price: '200', duration: '2h 10m', photo: PHOTOS.lash4D },
              { name: 'Whispy volume', desc: 'Stil Whispy cu varfuri texturate si efect airy modern.', price: '270', duration: '2h 30m', photo: PHOTOS.whispy },
              { name: 'Russian volume', desc: 'Tehnica Russian volume pentru gene pufoase, uniforme si de impact.', price: '250', duration: '2h 20m', photo: PHOTOS.russian },
              { name: 'Mega volume', desc: 'Mega volume cu densitate maxima pentru un look statement.', price: '280', duration: '2h 30m', photo: PHOTOS.mega },
              { name: 'Combi NC', desc: 'Tehnica Combi NC pentru definitie, directie controlata si finisaj profesional.', price: '230', duration: '2h 10m', photo: PHOTOS.combi },
              { name: 'Foxy eyeliner', desc: 'Efect Foxy eyeliner care alungeste optic privirea si accentueaza coltul extern.', price: '250', duration: '2h 20m', photo: PHOTOS.foxy },
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="card-interactive group h-full flex flex-col">
                  <div className="h-52 rounded-2xl mb-6 relative overflow-hidden">
                    <Image src={service.photo} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/40 via-transparent to-beauty-rose/10" />
                    <div className="absolute inset-0 bg-pink-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%' }} />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-beauty">
                      <span className="text-sm font-display font-bold text-beauty-rose">{service.price} lei</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">{service.name}</h3>
                  <p className="text-beauty-warm text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-beauty-blush-soft">
                    <span className="flex items-center gap-1 text-sm text-beauty-warm"><Clock className="w-3.5 h-3.5 text-beauty-rose" /> {service.duration}</span>
                    <span className="text-xs text-beauty-warm">Avans: {Math.round(parseInt(service.price) * 0.5)} lei</span>
                  </div>
                  <Link href="/booking" className="btn-primary w-full text-center mt-6 flex items-center justify-center gap-2">
                    Rezerva Acum <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/servicii" className="btn-secondary inline-flex items-center gap-2">Vezi Toate Serviciile (14)<ChevronRight className="w-4 h-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-beauty-cream via-white to-beauty-cream -z-10" />
        <div className="container-beauty">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-3xl overflow-hidden shadow-beauty-lg h-64 relative">
                      <Image src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop" alt="Beauty salon" fill className="object-cover" sizes="25vw" />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-beauty h-44 relative">
                      <Image src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=350&fit=crop" alt="Beauty products" fill className="object-cover" sizes="25vw" />
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="rounded-3xl overflow-hidden shadow-beauty h-44 relative">
                      <Image src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=350&fit=crop" alt="Beauty treatment" fill className="object-cover" sizes="25vw" />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-beauty-lg h-64 relative">
                      <Image src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop" alt="Extensii gene" fill className="object-cover" sizes="25vw" />
                    </div>
                  </div>
                </div>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-beauty-lg px-6 py-3 z-10 border border-beauty-blush/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-beauty-rose to-beauty-fuchsia flex items-center justify-center">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-beauty-charcoal">Premium Quality</p>
                      <p className="text-xs text-beauty-warm">Sector 2, Teiul Doamnei</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="badge mb-4 inline-flex">De Ce BeautySpot Anne?</span>
                <h2 className="section-heading mb-4">Experienta <span className="gradient-text">BeautySpot</span></h2>
                <p className="text-beauty-warm text-lg leading-relaxed mb-10">
                  14 tipuri de extensii gene si servicii sprancene, de la 1D la 4D, plus volume speciale.
                  Fiecare tratament personalizat cu produse premium.
                </p>
              </Reveal>
              <div className="space-y-6">
                {[
                  { icon: Award, title: 'Gama Completa', desc: 'De la 1D la 4D, Whispy volume, Russian volume, Mega volume, Combi NC si Foxy eyeliner.' },
                  { icon: Gem, title: 'Produse Premium', desc: 'Doar materiale de top, hipoalergenice si sigure pentru tine.' },
                  { icon: Heart, title: 'Personalizare Totala', desc: 'Fiecare set adaptat formei ochilor si dorintelor tale.' },
                  { icon: Flower2, title: 'Locatie Confortabila', desc: 'Sector 2, Zona Teiul Doamnei - spatiu intim si relaxant.' },
                ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-beauty transition-all duration-500 group">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-beauty-rose/10 to-beauty-fuchsia/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-beauty-rose" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-beauty-warm text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beauty-blush to-transparent" />
        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex"><Sparkles className="w-3.5 h-3.5 mr-1.5" />Cum Functioneaza</span>
            <h2 className="section-heading">Programeaza in 3 Pasi Simpli</h2>
            <p className="section-subheading">Procesul nostru de programare este rapid, simplu si 100% online</p>
            <div className="divider-rose mt-6" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', icon: Sparkles, title: 'Alege Serviciul', desc: 'Alege din cele 14 servicii disponibile - de la 1D la 4D, volume speciale sau servicii de sprancene.' },
              { step: '02', icon: Calendar, title: 'Selecteaza Data & Ora', desc: 'Alege ziua si ora care ti se potriveste. Platesti doar 50% avans online.' },
              { step: '03', icon: CheckCircle2, title: 'Confirmare pe WhatsApp', desc: 'Primesti confirmarea pe WhatsApp si email. Restul platesti la salon!' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="text-center relative">
                  {idx < 2 && (<div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-beauty-blush" />)}
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-beauty-rose/10 via-beauty-fuchsia/5 to-beauty-blush-soft flex items-center justify-center border border-beauty-blush/30">
                      <item.icon className="w-8 h-8 text-beauty-rose" />
                    </div>
                    <span className="inline-block text-xs font-bold text-beauty-fuchsia bg-beauty-fuchsia/10 px-3 py-1 rounded-full mb-3">{item.step}</span>
                    <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-beauty-warm text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <Link href="/booking" className="btn-primary inline-flex items-center gap-2 text-base"><Calendar className="w-4 h-4" />Incepe Programarea<ArrowRight className="w-4 h-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 luxe-pattern -z-10" />
        <div className="container-beauty relative">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex"><Star className="w-3.5 h-3.5 mr-1.5 fill-current" />Recenzii</span>
            <h2 className="section-heading">Ce Spun Clientele</h2>
            <p className="section-subheading">Peste 500 de cliente fericite ne recomanda</p>
            <div className="divider-rose mt-6" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {displayReviews.map((review, idx) => (
              <Reveal key={review.id || idx} delay={idx * 0.15}>
                <div className="card-luxe h-full flex flex-col relative">
                  <div className="absolute top-6 right-6 text-beauty-blush">
                    <svg className="w-10 h-10 opacity-40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-beauty-rose fill-beauty-rose" />))}
                  </div>
                  <p className="text-beauty-charcoal/80 leading-relaxed italic flex-1 mb-6">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-beauty-blush/40">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-beauty-rose to-beauty-fuchsia flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{review.client_name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.client_name}</p>
                      <p className="text-xs text-beauty-warm">Clienta verificata</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Google Review CTA */}
          <Reveal className="mt-12">
            <div className="bg-white rounded-3xl shadow-beauty p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-beauty-blush/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-beauty-rose/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-beauty-rose" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Ti-a placut experienta?</h3>
                  <p className="text-beauty-warm text-sm">Lasa-ne o recenzie pe Google - ne ajuta enorm!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="https://g.page/r/beautyspotanne/review" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2 !py-3 !px-6">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Recenzie Google
                </a>
                <Link href="/recenzii" className="btn-secondary !py-3 !px-6 flex items-center gap-2">
                  Recenzii Site <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ INSTAGRAM GALLERY ═══════ */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beauty-blush to-transparent" />
        <div className="container-beauty">
          <Reveal className="text-center mb-16">
            <span className="badge mb-4 inline-flex"><Instagram className="w-3.5 h-3.5 mr-1.5" />Instagram</span>
            <h2 className="section-heading">@beautyspotanne</h2>
            <p className="section-subheading">Urmareste-ne pentru inspiratie si rezultate reale</p>
            <div className="divider-rose mt-6" />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PHOTOS.gallery.map((photo, i) => (
              <Reveal key={i} delay={(i % 4) * 0.1}>
                <a href="https://www.instagram.com/beautyspotanne/" target="_blank" rel="noopener noreferrer"
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-beauty">
                  <Image src={photo} alt={`BeautySpot Anne gallery ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-beauty-rose/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 drop-shadow-lg" />
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
          <Image src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=600&fit=crop" alt="CTA" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-beauty-rose/90 via-beauty-fuchsia/85 to-beauty-rosegold/90" />
        </div>
        <div className="container-beauty relative text-center">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-sm mb-8 border border-white/20">
                <Sparkles className="w-4 h-4" />Pregatita sa stralucesti?
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">Programeaza-ti Transformarea</h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">Extensii gene de la 130 lei. Programare online rapida, platesti 50% avans. Confirmare pe WhatsApp!</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/booking" className="bg-white text-beauty-rose hover:bg-beauty-cream font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />Programare Online
                </Link>
                <a href="tel:0760089809" className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold py-4 px-10 rounded-full transition-all duration-300 flex items-center gap-2 text-lg backdrop-blur-sm">
                  <Phone className="w-5 h-5" />0760 089 809
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
