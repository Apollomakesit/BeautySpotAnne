'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Clock, ArrowRight, Sparkles, Crown, MessageCircle
} from 'lucide-react'
import { SERVICE_CATALOG, SERVICE_CATEGORIES, getServiceMeta } from '@/data/serviceCatalog'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function ServiciiPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Toate')

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) { setLoading(false); return }
    axios.get(`${apiUrl}/api/services`)
      .then((res) => setServices(Array.isArray(res.data) ? res.data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const sourceServices = services.length > 0 ? services : SERVICE_CATALOG
  const mergedServices = sourceServices.map((service, idx) => {
    const meta = getServiceMeta(service.name) || SERVICE_CATALOG[idx % SERVICE_CATALOG.length]
    const price = Number(service.price ?? meta.price)
    const deposit = Number(service.deposit_amount ?? meta.deposit_amount ?? Math.round(price * 0.5))

    return {
      id: service.id ?? idx + 1,
      name: service.name ?? meta.name,
      description: service.description || meta.description,
      duration_minutes: Number(service.duration_minutes ?? meta.duration_minutes),
      price,
      deposit_amount: deposit,
      image_url: service.image_url || meta.image_url,
      category: meta.category,
      hasApiId: !!service.id,
    }
  })

  const filteredServices = activeCategory === 'Toate'
    ? mergedServices
    : mergedServices.filter((service) => service.category === activeCategory)

  const categoryCounts = mergedServices.reduce(
    (counts, service) => {
      counts[service.category] = (counts[service.category] || 0) + 1
      return counts
    },
    { Toate: mergedServices.length }
  )

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
            <p className="section-subheading mb-8">Lista completa actualizata: 1D - 130 lei pana la Mega volume - 280 lei. Avans 50% online, restul la salon.</p>
            <div className="divider-rose" />
          </motion.div>
        </div>
      </section>

      {/* Category Filter + Features */}
      <section className="bg-white border-b border-beauty-blush-soft/50 sticky top-[60px] z-30 backdrop-blur-xl bg-white/95">
        <div className="container-beauty">
          <div className="flex flex-wrap items-center justify-center gap-3 py-5">
            {SERVICE_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-gradient-to-r from-beauty-rose to-beauty-fuchsia text-white shadow-beauty' : 'bg-beauty-cream-dark/50 text-beauty-warm hover:bg-beauty-rose/10'}`}>
                {cat} ({cat === 'Toate' ? categoryCounts.Toate : categoryCounts[cat] || 0})
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, idx) => {
                return (
                  <Reveal key={service.id} delay={(idx % 3) * 0.12}>
                    <div className="card-interactive group h-full flex flex-col">
                      <div className="h-52 rounded-2xl mb-6 relative overflow-hidden">
                        <Image src={service.image_url} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/30 via-transparent to-beauty-rose/10" />
                        <div className="absolute inset-0 bg-pink-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%' }} />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-beauty">
                          <span className="text-xs font-medium text-beauty-charcoal">{service.category}</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">{service.name}</h2>
                      <p className="text-beauty-warm text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
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
                      <Link href={service.hasApiId ? `/booking?service=${service.id}` : '/booking'} className="btn-primary w-full text-center flex items-center justify-center gap-2">Rezerva Acum <ArrowRight className="w-4 h-4" /></Link>
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
