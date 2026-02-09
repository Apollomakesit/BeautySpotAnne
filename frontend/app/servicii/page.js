'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Clock, ArrowRight, Sparkles, Eye, Heart, Star,
  Layers, Wand2, Droplets, Scissors, Crown, Gem, CheckCircle2
} from 'lucide-react'

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

const SERVICE_ICONS = [Eye, Layers, Sparkles, Wand2, Heart, Droplets, Star, Scissors]

const SERVICE_PHOTOS = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop',
]

export default function ServiciiPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="overflow-hidden">
      {/* ═══════ PAGE HERO ═══════ */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-fuchsia/8 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-beauty-rosegold/10 rounded-full blur-[100px] -z-10" />

        <div className="container-beauty text-center">
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
            <p className="section-subheading mb-8">
              Fiecare tratament este personalizat pentru a scoate in evidenta
              frumusetea ta naturala. Folosim doar produse premium si tehnici avansate.
            </p>
            <div className="divider-rose" />
          </motion.div>
        </div>
      </section>

      {/* ═══════ FEATURES BAR ═══════ */}
      <section className="bg-white border-b border-beauty-blush-soft/50">
        <div className="container-beauty">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {[
              { icon: Crown, text: 'Produse Premium' },
              { icon: Gem, text: 'Tehnici Avansate' },
              { icon: Heart, text: 'Abordare Personalizata' },
              { icon: CheckCircle2, text: 'Rezultate Garantate' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 text-sm text-beauty-warm">
                <item.icon className="w-4 h-4 text-beauty-rose" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
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
                const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length]
                const photo = SERVICE_PHOTOS[idx % SERVICE_PHOTOS.length]
                return (
                  <Reveal key={service.id} delay={(idx % 3) * 0.12}>
                    <div className="card-interactive group h-full flex flex-col">
                      {/* Visual header with photo */}
                      <div className="h-52 rounded-2xl mb-6 relative overflow-hidden">
                        {service.image_url ? (
                          <Image
                            src={service.image_url}
                            alt={service.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <Image
                            src={photo}
                            alt={service.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/30 via-transparent to-beauty-rose/10" />
                        <div className="absolute inset-0 bg-pink-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%' }} />
                        {/* Category badge */}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-beauty">
                          <Icon className="w-4 h-4 text-beauty-rose inline-block mr-1" />
                          <span className="text-xs font-medium text-beauty-charcoal">Premium</span>
                        </div>
                      </div>

                      {/* Content */}
                      <h2 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">
                        {service.name}
                      </h2>
                      {service.description && (
                        <p className="text-beauty-warm text-sm leading-relaxed mb-6 flex-1">
                          {service.description}
                        </p>
                      )}

                      {/* Details */}
                      <div className="space-y-3 py-4 border-t border-beauty-blush-soft mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-beauty-rose" /> Durata
                          </span>
                          <span className="font-semibold text-sm">{service.duration_minutes} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Pret</span>
                          <span className="text-xl font-display font-bold text-beauty-rose">
                            {service.price} <span className="text-sm font-body font-normal text-beauty-warm">RON</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Avans online</span>
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
                        Rezerva Acum
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
                { name: 'Extensii Gene Classic', desc: 'Aspect natural si elegant cu gene 1:1. Ideal pentru un look rafinat de zi cu zi.', price: '250', duration: '120', deposit: '100' },
                { name: 'Volume 2D-3D', desc: 'Volum controlat cu bucheti de 2-3 gene. Perfect pentru un efect dramatic dar sofisticat.', price: '300', duration: '150', deposit: '100' },
                { name: 'Mega Volume 4D-6D', desc: 'Volum maxim si plin. Ideal pentru ocazii speciale sau un look WOW de zi cu zi.', price: '350', duration: '180', deposit: '150' },
                { name: 'Lash Lift & Tint', desc: 'Gene naturale curbate si colorate. Efect WOW fara extensii, dureaza 6-8 saptamani.', price: '180', duration: '60', deposit: '80' },
                { name: 'Intretinere 2 Saptamani', desc: 'Completare si reglare la 2 saptamani. Mentine aspectul proaspat al extensiilor.', price: '150', duration: '90', deposit: '50' },
                { name: 'Indepartare Gene', desc: 'Indepartare profesionala si sigura a extensiilor, fara a afecta genele naturale.', price: '80', duration: '45', deposit: '40' },
              ].map((service, idx) => {
                const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length]
                const photo = SERVICE_PHOTOS[idx % SERVICE_PHOTOS.length]
                return (
                  <Reveal key={idx} delay={(idx % 3) * 0.12}>
                    <div className="card-interactive group h-full flex flex-col">
                      <div className="h-52 rounded-2xl mb-6 relative overflow-hidden">
                        <Image
                          src={photo}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/30 via-transparent to-beauty-rose/10" />
                        <div className="absolute inset-0 bg-pink-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%' }} />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-beauty">
                          <Icon className="w-4 h-4 text-beauty-rose inline-block mr-1" />
                          <span className="text-xs font-medium text-beauty-charcoal">Premium</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-display font-bold mb-2 group-hover:text-beauty-rose transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-beauty-warm text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                      <div className="space-y-3 py-4 border-t border-beauty-blush-soft mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-beauty-rose" /> Durata
                          </span>
                          <span className="font-semibold text-sm">{service.duration} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Pret</span>
                          <span className="text-xl font-display font-bold text-beauty-rose">
                            {service.price} <span className="text-sm font-body font-normal text-beauty-warm">RON</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-beauty-warm">Avans online</span>
                          <span className="font-semibold text-sm text-beauty-gold">{service.deposit} RON</span>
                        </div>
                      </div>
                      <Link
                        href="/booking"
                        className="btn-primary w-full text-center flex items-center justify-center gap-2"
                      >
                        Rezerva Acum <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 relative">
        <div className="absolute inset-0 luxe-pattern -z-10" />
        <div className="container-beauty">
          <Reveal>
            <div className="card-glass text-center py-12 px-8 bg-gradient-to-br from-beauty-rose-light/50 to-beauty-blush-soft/50 border border-beauty-blush/30">
              <Crown className="w-8 h-8 text-beauty-rose mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">
                Nu esti sigura ce serviciu ti se potriveste?
              </h3>
              <p className="text-beauty-warm mb-6 max-w-lg mx-auto">
                Contacteaza-ne si te vom ajuta sa alegi tratamentul perfect
                pentru forma ochilor si stilul tau.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary flex items-center gap-2">
                  Contacteaza-ne
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/booking" className="btn-secondary">
                  Programare Directa
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
