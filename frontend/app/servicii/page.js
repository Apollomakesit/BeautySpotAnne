'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Clock, ArrowRight, Sparkles, Eye, Heart, Star,
  Layers, Wand2, Droplets, Scissors, Crown, Gem, CheckCircle2, MessageCircle
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

const SERVICE_ICONS = [Eye, Layers, Sparkles, Wand2, Heart, Droplets, Star, Scissors, Eye, Layers, Sparkles, Wand2, Gem, Crown]

/* Photos grouped by service type */
const SERVICE_PHOTOS = {
  classic: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=400&fit=crop&crop=eyes',
  lightVolume: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&h=400&fit=crop&crop=face',
  mediumVolume: 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=600&h=400&fit=crop&crop=face',
  heavyVolume: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=face',
  whispy: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=600&h=400&fit=crop&crop=face',
  russian: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop&crop=face',
  mega: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop&crop=face',
  combi: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop',
  foxy: 'https://images.unsplash.com/photo-1588514912908-8e32e4b43b1c?w=600&h=400&fit=crop&crop=face',
  brows: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&h=400&fit=crop&crop=face',
}

/* Real services from BeautySpot Anne */
const REAL_SERVICES = [
  { name: '1D Classic', desc: 'Extensii gene clasice - o gena pe fiecare gena naturala. Look natural si elegant, perfect pentru zilnic.', price: 130, duration: 90, photo: SERVICE_PHOTOS.classic, category: 'Extensii Gene' },
  { name: '1&2D Mix', desc: 'Mix intre classic si volum usor. Aspect natural cu putin mai mult volum decat 1D.', price: 140, duration: 100, photo: SERVICE_PHOTOS.classic, category: 'Extensii Gene' },
  { name: '2D Volume', desc: 'Volum usor cu buchete de 2 gene. Efect natural dar cu mai multa plinitate.', price: 150, duration: 100, photo: SERVICE_PHOTOS.lightVolume, category: 'Extensii Gene' },
  { name: '2&3D Mix', desc: 'Mix de volum mediu - combinatie de buchete 2D si 3D pentru un efect echilibrat.', price: 160, duration: 110, photo: SERVICE_PHOTOS.lightVolume, category: 'Extensii Gene' },
  { name: '3D Volume', desc: 'Volum mediu cu buchete de 3 gene. Plinitate vizibila, look glamour dar natural.', price: 170, duration: 120, photo: SERVICE_PHOTOS.mediumVolume, category: 'Extensii Gene' },
  { name: '3&4D Mix', desc: 'Volum mediu-mare - combinatie de buchete 3D si 4D. Efect dramatic dar rafinat.', price: 180, duration: 120, photo: SERVICE_PHOTOS.mediumVolume, category: 'Extensii Gene' },
  { name: '4D Volume', desc: 'Volum mare cu buchete de 4 gene. Look plin si dramatic, ideal pentru seara.', price: 200, duration: 130, photo: SERVICE_PHOTOS.heavyVolume, category: 'Extensii Gene' },
  { name: 'Whispy Volume', desc: 'Gene cu efect wispy - textura naturala cu varfuri mai lungi. Look modern, fresh si rafinat.', price: 270, duration: 150, photo: SERVICE_PHOTOS.whispy, category: 'Tehnici Speciale' },
  { name: 'Russian Volume', desc: 'Tehnica ruseasca de volum - gene pufoase, pline si confortabile. Efect spectaculos.', price: 250, duration: 140, photo: SERVICE_PHOTOS.russian, category: 'Tehnici Speciale' },
  { name: 'Mega Volume', desc: 'Volum maxim si dramatic. Gene ultra-pline, perfecte pentru un look WOW de impact.', price: 280, duration: 150, photo: SERVICE_PHOTOS.mega, category: 'Tehnici Speciale' },
  { name: 'Combi NC', desc: 'Combinatie Natural + Classic - efect natural dar cu definitie. Cele mai bune din ambele lumi.', price: 230, duration: 130, photo: SERVICE_PHOTOS.combi, category: 'Tehnici Speciale' },
  { name: 'Foxy Eyeliner', desc: 'Efect de eyeliner realizat prin extensii gene. Privire felina, seducatoare si eleganta.', price: 250, duration: 140, photo: SERVICE_PHOTOS.foxy, category: 'Tehnici Speciale' },
  { name: 'Pensat', desc: 'Pensarea profesionala a sprancenelor - curatare si conturare precisa cu ata sau penseta.', price: 30, duration: 15, photo: SERVICE_PHOTOS.brows, category: 'Sprancene' },
  { name: 'Stilizat Sprancene', desc: 'Modelare si stilizare completa a sprancenelor - forma perfecta adaptata fetei tale.', price: 60, duration: 30, photo: SERVICE_PHOTOS.brows, category: 'Sprancene' },
]

export default function ServiciiPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Toate')

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) { setLoading(false); return }
    axios.get(`${apiUrl}/api/services`)
      .then((res) => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['Toate', 'Extensii Gene', 'Tehnici Speciale', 'Sprancene']
  const filteredFallback = activeCategory === 'Toate' ? REAL_SERVICES : REAL_SERVICES.filter(s => s.category === activeCategory)

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-fuchsia/8 rounded-full blur-[120px] -z-10" />
        <div className="container-beauty text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge-gold mb-4 inline-flex"><Sparkles className="w-3.5 h-3.5 mr-1.5" />14 Servicii Disponibile</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">Servicii & <span className="gradient-text">Preturi</span></h1>
            <p className="section-subheading mb-8">De la Classic 1D (130 lei) pana la Mega Volume (280 lei). Avans 50% online, restul la salon.</p>
            <div className="divider-rose" />
          </motion.div>
        </div>
      </section>

      {/* Category Filter + Features */}
      <section className="bg-white border-b border-beauty-blush-soft/50 sticky top-[60px] z-30 backdrop-blur-xl bg-white/95">
        <div className="container-beauty">
          <div className="flex flex-wrap items-center justify-center gap-3 py-5">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-gradient-to-r from-beauty-rose to-beauty-fuchsia text-white shadow-beauty' : 'bg-beauty-cream-dark/50 text-beauty-warm hover:bg-beauty-rose/10'}`}>
                {cat} {cat === 'Extensii Gene' ? '(7)' : cat === 'Tehnici Speciale' ? '(5)' : cat === 'Sprancene' ? '(2)' : '(14)'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-beauty">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map((i) => (<div key={i} className="rounded-3xl bg-beauty-cream animate-pulse h-[480px]" />))}
            </div>
          ) : services.length > 0 ? (
            /* Render from API */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length]
                const fallbackPhoto = REAL_SERVICES[idx % REAL_SERVICES.length]?.photo || SERVICE_PHOTOS.classic
                return (
                  <Reveal key={service.id} delay={(idx % 3) * 0.12}>
                    <div className="card-interactive group h-full flex flex-col">
                      <div className="h-52 rounded-2xl mb-6 relative overflow-hidden">
                        <Image src={service.image_url || fallbackPhoto} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/30 via-transparent to-beauty-rose/10" />
                        <div className="absolute inset-0 bg-pink-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%' }} />
                      </div>
                      <h2 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">{service.name}</h2>
                      {service.description && <p className="text-beauty-warm text-sm leading-relaxed mb-6 flex-1">{service.description}</p>}
                      <div className="space-y-3 py-4 border-t border-beauty-blush-soft mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-beauty-rose" /> Durata</span>
                          <span className="font-semibold text-sm">{service.duration_minutes} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Pret</span>
                          <span className="text-xl font-display font-bold text-beauty-rose">{service.price} <span className="text-sm font-body font-normal text-beauty-warm">lei</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Avans 50%</span>
                          <span className="font-semibold text-sm text-beauty-gold">{service.deposit_amount} lei</span>
                        </div>
                      </div>
                      <Link href={`/booking?service=${service.id}`} className="btn-primary w-full text-center flex items-center justify-center gap-2">Rezerva Acum <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          ) : (
            /* Fallback: real services */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFallback.map((service, idx) => {
                const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length]
                return (
                  <Reveal key={idx} delay={(idx % 3) * 0.12}>
                    <div className="card-interactive group h-full flex flex-col">
                      <div className="h-52 rounded-2xl mb-6 relative overflow-hidden">
                        <Image src={service.photo} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/30 via-transparent to-beauty-rose/10" />
                        <div className="absolute inset-0 bg-pink-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%' }} />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-beauty">
                          <span className="text-xs font-medium text-beauty-charcoal">{service.category}</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">{service.name}</h2>
                      <p className="text-beauty-warm text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                      <div className="space-y-3 py-4 border-t border-beauty-blush-soft mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-beauty-rose" /> Durata</span>
                          <span className="font-semibold text-sm">{service.duration} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Pret</span>
                          <span className="text-xl font-display font-bold text-beauty-rose">{service.price} <span className="text-sm font-body font-normal text-beauty-warm">lei</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Avans 50%</span>
                          <span className="font-semibold text-sm text-beauty-gold">{Math.round(service.price * 0.5)} lei</span>
                        </div>
                      </div>
                      <Link href="/booking" className="btn-primary w-full text-center flex items-center justify-center gap-2">Rezerva Acum <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 relative">
        <div className="absolute inset-0 luxe-pattern -z-10" />
        <div className="container-beauty">
          <Reveal>
            <div className="card-glass text-center py-12 px-8 bg-gradient-to-br from-beauty-rose-light/50 to-beauty-blush-soft/50 border border-beauty-blush/30">
              <Crown className="w-8 h-8 text-beauty-rose mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">Nu esti sigura ce serviciu ti se potriveste?</h3>
              <p className="text-beauty-warm mb-6 max-w-lg mx-auto">Trimite-ne un mesaj pe WhatsApp si te vom ajuta sa alegi tratamentul perfect!</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/40760089809?text=Buna%20ziua!%20As%20dori%20recomandari%20pentru%20extensii%20gene." target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Anne
                </a>
                <Link href="/booking" className="btn-secondary">Programare Directa</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
