'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Clock, ArrowRight, Sparkles } from 'lucide-react'
import { LUXURY_PHOTOS, SERVICE_FALLBACK_IMAGES } from '../luxuryThemeData'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
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

export default function ServiciiPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      setLoading(false)
      return
    }
    axios
      .get(`${apiUrl}/api/services`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="overflow-hidden">
      {/* ═══════ PAGE HERO ═══════ */}
      <section className="relative pt-32 pb-20 dot-pattern">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-rose/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-beauty-gold/8 rounded-full blur-[100px] -z-10" />

        <div className="container-beauty">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-gold mb-4 inline-flex">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Tratamente Premium
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                Serviciile <span className="gradient-text">Noastre</span>
              </h1>
              <p className="section-subheading !mx-0 mb-8">
                Fiecare tratament este personalizat pentru a scoate in evidenta
                frumusetea ta naturala. Folosim produse profesionale si un stil
                feminin elegant, potrivit unei imagini premium.
              </p>
              <div className="divider-rose !mx-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-beauty-xl">
                <Image
                  src={LUXURY_PHOTOS.heroDetail.src}
                  alt={LUXURY_PHOTOS.heroDetail.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES GRID ═══════ */}
      <section className="section-padding bg-white">
        <div className="container-beauty">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-3xl bg-beauty-cream animate-pulse h-[480px]" />
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const fallbackImage = SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length]
                const imageSrc = service.image_url || fallbackImage.src
                return (
                  <Reveal key={service.id} delay={(idx % 3) * 0.12}>
                    <div className="card-interactive group h-full flex flex-col">
                      <div className="h-48 rounded-2xl mb-6 relative overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={service.name || fallbackImage.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            if (e.currentTarget.src !== fallbackImage.src) {
                              e.currentTarget.src = fallbackImage.src
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium bg-white/90 text-beauty-charcoal">
                          Luxury Beauty
                        </span>
                      </div>

                      {/* Content */}
                      <h2 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">
                        {service.name}
                      </h2>
                      {service.description && (
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                          {service.description}
                        </p>
                      )}

                      {/* Details */}
                      <div className="space-y-3 py-4 border-t border-beauty-cream-dark/50 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" /> Durată
                          </span>
                          <span className="font-semibold text-sm">{service.duration_minutes} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Preț</span>
                          <span className="text-xl font-display font-bold text-beauty-rose">
                            {service.price} <span className="text-sm font-body font-normal text-gray-400">RON</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Avans online</span>
                          <span className="font-semibold text-sm text-beauty-gold">
                            {service.deposit_amount} RON
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/booking?service=${service.id}`}
                        className="btn-primary w-full text-center flex items-center justify-center gap-2"
                      >
                        Rezervă Acum
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          ) : (
            /* ═══════ FALLBACK ═══════ */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Extensii Gene Classic', desc: 'Aspect natural și elegant cu gene 1:1. Ideal pentru un look rafinat de zi cu zi.', price: '250', duration: '120', deposit: '100' },
                { name: 'Volume 2D‑3D', desc: 'Volum controlat cu bucheți de 2‑3 gene. Perfect pentru un efect dramatic dar sofisticat.', price: '300', duration: '150', deposit: '100' },
                { name: 'Mega Volume 4D‑6D', desc: 'Volum maxim și plin. Ideal pentru ocazii speciale sau un look WOW de zi cu zi.', price: '350', duration: '180', deposit: '150' },
                { name: 'Lash Lift & Tint', desc: 'Gene naturale curbate și colorate. Efect WOW fără extensii, durează 6‑8 sâptămâni.', price: '180', duration: '60', deposit: '80' },
                { name: 'Întreținere 2 Săptămâni', desc: 'Completare și reglare la 2 săptămâni. Menține aspectul proaspăt al extensiilor.', price: '150', duration: '90', deposit: '50' },
                { name: 'Îndepărtare Gene', desc: 'Îndepărtare profesională și sigură a extensiilor, fără a afecta genele naturale.', price: '80', duration: '45', deposit: '40' },
              ].map((service, idx) => {
                const fallbackImage = SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length]
                return (
                  <Reveal key={idx} delay={(idx % 3) * 0.12}>
                    <div className="card-interactive group h-full flex flex-col">
                      <div className="h-48 rounded-2xl mb-6 relative overflow-hidden">
                        <img
                          src={fallbackImage.src}
                          alt={fallbackImage.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium bg-white/90 text-beauty-charcoal">
                          Luxury Beauty
                        </span>
                      </div>
                      <h2 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                      <div className="space-y-3 py-4 border-t border-beauty-cream-dark/50 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" /> Durată
                          </span>
                          <span className="font-semibold text-sm">{service.duration} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Preț</span>
                          <span className="text-xl font-display font-bold text-beauty-rose">
                            {service.price} <span className="text-sm font-body font-normal text-gray-400">RON</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Avans online</span>
                          <span className="font-semibold text-sm text-beauty-gold">{service.deposit} RON</span>
                        </div>
                      </div>
                      <Link
                        href="/booking"
                        className="btn-primary w-full text-center flex items-center justify-center gap-2"
                      >
                        Rezervă Acum <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ INFO BANNER ═══════ */}
      <section className="py-16 bg-beauty-cream-dark/30">
        <div className="container-beauty">
          <Reveal>
            <div className="card-glass text-center py-12 px-8">
              <Sparkles className="w-8 h-8 text-beauty-gold mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">
                Nu ești sigură ce serviciu ți se potrivește?
              </h3>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Contactează‑ne și te vom ajuta să alegi tratamentul perfect 
                pentru forma ochilor și stilul tău.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary flex items-center gap-2">
                  Contactează-ne
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/booking" className="btn-secondary">
                  Programare Directă
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
