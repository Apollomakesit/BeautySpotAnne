'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin, Phone, Mail, Clock, Send, Instagram,
  Sparkles, MessageCircle, ArrowRight, Calendar, Crown, Star
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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (apiUrl) { await axios.post(`${apiUrl}/api/contact/`, formData) } else { await new Promise((r) => setTimeout(r, 1500)) }
      toast.success('Mesajul a fost trimis! Te vom contacta in curand.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error('Eroare la trimiterea mesajului.')
    } finally { setSending(false) }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />
        <div className="container-beauty text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge mb-4 inline-flex"><MessageCircle className="w-3.5 h-3.5 mr-1.5" />Contact</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">Hai Sa <span className="gradient-text">Vorbim</span></h1>
            <p className="section-subheading mb-8">Scrie-ne pe WhatsApp, suna-ne sau trimite un mesaj. Suntem aici sa te ajutam!</p>
            <div className="divider-rose" />
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="bg-white border-b border-beauty-blush-soft/50">
        <div className="container-beauty py-8">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/40760089809?text=Buna%20ziua!%20As%20dori%20informatii%20despre%20serviciile%20BeautySpot%20Anne." target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp: 0760 089 809
            </a>
            <a href="tel:0760089809" className="btn-primary flex items-center gap-2 !py-3 !px-6">
              <Phone className="w-4 h-4" /> Suna: 0760 089 809
            </a>
            <a href="mailto:e.llyyy@yahoo.com" className="btn-secondary flex items-center gap-2 !py-3 !px-6">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-beauty">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="card border-beauty-blush/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-beauty-rose/15 to-beauty-fuchsia/15 flex items-center justify-center">
                      <Send className="w-5 h-5 text-beauty-rose" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold">Trimite un Mesaj</h2>
                      <p className="text-sm text-beauty-warm">Raspundem in maxim 24 de ore</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-beauty-charcoal mb-2">Numele tau</label>
                        <input type="text" required placeholder="ex. Maria Popescu" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-beauty" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-beauty-charcoal mb-2">Telefon</label>
                        <input type="tel" placeholder="ex. 0721 234 567" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-beauty" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-beauty-charcoal mb-2">Email</label>
                      <input type="email" required placeholder="ex. maria@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-beauty" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-beauty-charcoal mb-2">Mesaj</label>
                      <textarea required placeholder="Spune-ne cum te putem ajuta..." rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="textarea-beauty" />
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50">
                      {sending ? 'Se trimite...' : (<><Send className="w-4 h-4" />Trimite Mesajul</>)}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: MapPin, title: 'Adresa Salonului', lines: ['Bucuresti, Sector 2', 'Zona Teiul Doamnei'] },
                { icon: Phone, title: 'Telefon & WhatsApp', lines: ['0760 089 809'], href: 'tel:0760089809' },
                { icon: Mail, title: 'Email', lines: ['e.llyyy@yahoo.com'], href: 'mailto:e.llyyy@yahoo.com' },
                { icon: Clock, title: 'Program', lines: ['Luni - Vineri: 10:00 - 20:00', 'Sambata: 10:00 - 16:00', 'Duminica: Inchis'] },
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="card group border-beauty-blush/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-beauty-rose/10 to-beauty-fuchsia/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-beauty-rose" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold mb-1.5">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-sm text-beauty-warm">
                            {item.href && i === 0 ? <a href={item.href} className="hover:text-beauty-rose transition-colors">{line}</a> : line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Social Links */}
              <Reveal delay={0.4}>
                <div className="card bg-gradient-to-br from-beauty-rose-light/40 to-beauty-blush-soft/40 border-beauty-blush/20">
                  <h3 className="font-display font-bold mb-4">Urmareste-ne & Contacteaza-ne</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.instagram.com/beautyspotanne/" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-beauty-rose/5 border border-beauty-blush/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-beauty">
                      <Instagram className="w-5 h-5 text-beauty-rose" /><span className="text-sm font-medium">Instagram</span>
                    </a>
                    <a href="https://wa.me/40760089809" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#25D366]/5 border border-beauty-blush/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-beauty">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" /><span className="text-sm font-medium">WhatsApp</span>
                    </a>
                  </div>
                  {/* Google Review Link */}
                  <div className="mt-4 pt-4 border-t border-beauty-blush/20">
                    <a href="https://g.page/r/beautyspotanne/review" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-beauty-warm hover:text-beauty-rose transition-colors">
                      <Star className="w-4 h-4 text-beauty-rose" />
                      Lasa-ne o recenzie pe Google Maps
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps with Pin */}
      <section className="section-padding relative">
        <div className="absolute inset-0 luxe-pattern -z-10" />
        <div className="container-beauty">
          <Reveal className="text-center mb-12">
            <span className="badge mb-4 inline-flex"><MapPin className="w-3.5 h-3.5 mr-1.5" />Locatie</span>
            <h2 className="section-heading">Unde Ne Gasesti</h2>
            <p className="section-subheading">Bucuresti, Sector 2 - Zona Teiul Doamnei</p>
            <div className="divider-rose mt-4" />
          </Reveal>
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-beauty-lg h-[400px] border border-beauty-blush/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.2!2d26.1185!3d44.4592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4c7e8b1c5d%3A0x0!2zNDTCsDI3JzMzLjEiTiAyNsKwMDcnMDYuNiJF!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro&markers=color:red%7C44.4592,26.1185"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BeautySpot Anne - Sector 2, Teiul Doamnei, Bucuresti"
              />
            </div>
            <div className="mt-4 text-center">
              <a href="https://www.google.com/maps/search/BeautySpot+Anne+Teiul+Doamnei+Sector+2+Bucuresti" target="_blank" rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 !py-2.5 !px-5 text-sm">
                <MapPin className="w-4 h-4" /> Deschide in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container-beauty">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=400&fit=crop" alt="Beauty salon" fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-beauty-rose/90 via-beauty-fuchsia/85 to-beauty-rosegold/90" />
              <div className="relative text-center py-16 px-8">
                <Calendar className="w-8 h-8 text-white/80 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 text-white">Pregatita pentru o transformare?</h3>
                <p className="text-white/80 mb-6 max-w-lg mx-auto">Extensii gene de la 130 lei. Programeaza-te online sau pe WhatsApp!</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/booking" className="bg-white text-beauty-rose hover:bg-beauty-cream font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4" />Programare Online
                  </Link>
                  <a href="https://wa.me/40760089809" target="_blank" rel="noopener noreferrer"
                    className="bg-[#25D366] text-white hover:bg-[#20BD5A] font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-xl hover:-translate-y-1 inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
