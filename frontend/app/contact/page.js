'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'
import Link from 'next/link'
import {
  MapPin, Phone, Mail, Clock, Send, Instagram, Facebook,
  Sparkles, MessageCircle, ArrowRight, Heart, Calendar
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500))
    toast.success('Mesajul a fost trimis! Te vom contacta în curând.')
    setFormData({ name: '', email: '', phone: '', message: '' })
    setSending(false)
  }

  return (
    <div className="overflow-hidden">
      {/* ═══════ PAGE HERO ═══════ */}
      <section className="relative pt-32 pb-20 dot-pattern">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-rose/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-beauty-gold/8 rounded-full blur-[100px] -z-10" />

        <div className="container-beauty text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge mb-4 inline-flex">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Hai Să <span className="gradient-text">Vorbim</span>
            </h1>
            <p className="section-subheading mb-8">
              Ai întrebări? Suntem aici să te ajutăm. Scrie-ne un mesaj sau sună-ne direct.
            </p>
            <div className="divider-rose" />
          </motion.div>
        </div>
      </section>

      {/* ═══════ CONTACT CONTENT ═══════ */}
      <section className="section-padding bg-white">
        <div className="container-beauty">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* ─── Left: Contact Form ─── */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="card">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-beauty-rose/10 flex items-center justify-center">
                      <Send className="w-5 h-5 text-beauty-rose" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold">Trimite un Mesaj</h2>
                      <p className="text-sm text-gray-400">Răspundem în maxim 24 de ore</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Numele tău
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="ex. Maria Popescu"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-beauty"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          placeholder="ex. 0721 234 567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-beauty"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ex. maria@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-beauty"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Mesaj
                      </label>
                      <textarea
                        required
                        placeholder="Spune-ne cum te putem ajuta..."
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="textarea-beauty"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50"
                    >
                      {sending ? (
                        'Se trimite...'
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Trimite Mesajul
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            {/* ─── Right: Info Cards ─── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Cards */}
              {[
                {
                  icon: MapPin,
                  title: 'Adresa Salonului',
                  lines: ['București, România', 'Sector 1'],
                  color: 'beauty-rose',
                },
                {
                  icon: Phone,
                  title: 'Telefon',
                  lines: ['+40 XXX XXX XXX'],
                  href: 'tel:+40XXXXXXXXX',
                  color: 'beauty-gold',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['contact@beautyspotanne.ro'],
                  href: 'mailto:contact@beautyspotanne.ro',
                  color: 'beauty-sage',
                },
                {
                  icon: Clock,
                  title: 'Program',
                  lines: ['Luni - Vineri: 10:00 - 20:00', 'Sâmbătă: 10:00 - 16:00', 'Duminică: Închis'],
                  color: 'beauty-rose',
                },
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="card group">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-${item.color}/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-5 h-5 text-${item.color}`} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold mb-1.5">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-sm text-gray-500">
                            {item.href && i === 0 ? (
                              <a href={item.href} className="hover:text-beauty-rose transition-colors">
                                {line}
                              </a>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Social Links */}
              <Reveal delay={0.4}>
                <div className="card bg-gradient-to-br from-beauty-rose/5 to-beauty-gold/5">
                  <h3 className="font-display font-bold mb-4">Urmărește-ne</h3>
                  <div className="flex gap-3">
                    <a
                      href="https://instagram.com/beautyspotanne"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-beauty-rose/5 border border-beauty-cream-dark/50 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Instagram className="w-5 h-5 text-beauty-rose" />
                      <span className="text-sm font-medium">Instagram</span>
                    </a>
                    <a
                      href="https://facebook.com/beautyspotanne"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-beauty-rose/5 border border-beauty-cream-dark/50 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Facebook className="w-5 h-5 text-beauty-rose" />
                      <span className="text-sm font-medium">Facebook</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAP PLACEHOLDER ═══════ */}
      <section className="section-padding bg-beauty-cream-dark/20">
        <div className="container-beauty">
          <Reveal className="text-center mb-12">
            <span className="badge mb-4 inline-flex">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Locație
            </span>
            <h2 className="section-heading">Unde Ne Găsești</h2>
            <div className="divider-rose mt-4" />
          </Reveal>
          
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-beauty-lg bg-beauty-cream-dark h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-beauty-rose/40 mx-auto mb-3" />
                <p className="text-gray-500">
                  Hartă interactivă — București, România
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-20">
        <div className="container-beauty">
          <Reveal>
            <div className="card-glass text-center py-12 px-8 bg-gradient-to-br from-beauty-rose/5 to-beauty-gold/5">
              <Calendar className="w-8 h-8 text-beauty-gold mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                Pregătită pentru o transformare?
              </h3>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Nu mai aștepta — programează-ți vizita online acum și 
                descoperă cele mai frumoase extensii de gene.
              </p>
              <Link href="/booking" className="btn-primary inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Programează-te Acum
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
