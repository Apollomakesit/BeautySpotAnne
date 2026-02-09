'use client'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import {
  Star, ArrowRight, Sparkles, MessageCircle, Send,
  User, Loader2, Heart, Calendar, Quote, Crown
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

export default function RecenziiPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    client_name: '',
    rating: 5,
    text: '',
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = () => {
    setLoading(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      setLoading(false)
      return
    }
    axios
      .get(`${apiUrl}/api/reviews/`)
      .then((res) => setReviews(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/`, form)
      toast.success('Recenzia ta a fost trimisa! Va fi afisata dupa aprobare.')
      setForm({ client_name: '', rating: 5, text: '' })
      setShowForm(false)
    } catch (err) {
      toast.error('Eroare la trimiterea recenziei.')
    } finally {
      setSubmitting(false)
    }
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-fuchsia/8 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-beauty-rosegold/10 rounded-full blur-[100px] -z-10" />

        <div className="container-beauty text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge-gold mb-4 inline-flex">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Recenzii Clienti
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ce Spun <span className="gradient-text">Clientele</span>
            </h1>
            <p className="section-subheading mb-6">
              Experiente reale de la clientele care ne-au trecut pragul.
            </p>

            {/* Rating Summary */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-beauty border border-beauty-blush/30">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-beauty-rose fill-beauty-rose" />
                ))}
              </div>
              <span className="text-2xl font-display font-bold text-beauty-charcoal">{avgRating}</span>
              <span className="text-sm text-beauty-warm">({reviews.length} recenzii)</span>
            </div>

            <div className="divider-rose mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-white">
        <div className="container-beauty">
          {/* Add Review Button */}
          <Reveal className="text-center mb-12">
            <button
              onClick={() => setShowForm(!showForm)}
              className={clsx(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300',
                showForm
                  ? 'bg-beauty-cream-dark text-beauty-warm border border-beauty-blush/30'
                  : 'btn-primary'
              )}
            >
              {showForm ? 'Anuleaza' : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  Lasa o Recenzie
                </>
              )}
            </button>
          </Reveal>

          {/* Review Form */}
          {showForm && (
            <Reveal>
              <div className="max-w-lg mx-auto mb-16">
                <div className="card border-beauty-blush/30">
                  <h2 className="text-xl font-display font-bold mb-6">
                    Scrie o Recenzie
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-beauty-charcoal mb-2">Numele tau</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                        <input
                          type="text"
                          required
                          placeholder="ex. Maria P."
                          value={form.client_name}
                          onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                          className="input-beauty !pl-11"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-beauty-charcoal mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setForm({ ...form, rating })}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              className={clsx(
                                'w-8 h-8 transition-colors',
                                rating <= form.rating
                                  ? 'text-beauty-rose fill-beauty-rose'
                                  : 'text-beauty-cream-dark hover:text-beauty-rose/50'
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-beauty-charcoal mb-2">
                        Experienta ta
                      </label>
                      <textarea
                        required
                        placeholder="Spune-ne cum a fost experienta ta la salon..."
                        rows="4"
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        className="textarea-beauty"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {submitting ? 'Se trimite...' : 'Trimite Recenzia'}
                    </button>

                    <p className="text-xs text-beauty-warm">
                      Recenzia va fi afisata pe site dupa aprobare.
                    </p>
                  </form>
                </div>
              </div>
            </Reveal>
          )}

          {/* Reviews */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-3xl bg-beauty-cream animate-pulse h-56" />
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <Reveal key={review.id} delay={(idx % 3) * 0.1}>
                  <div className="card-luxe h-full flex flex-col relative">
                    {/* Decorative quote */}
                    <div className="absolute top-6 right-6 text-beauty-blush">
                      <svg className="w-8 h-8 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={clsx(
                            'w-4 h-4',
                            i < review.rating
                              ? 'text-beauty-rose fill-beauty-rose'
                              : 'text-beauty-cream-dark'
                          )}
                        />
                      ))}
                    </div>

                    {/* Text */}
                    {review.text && (
                      <p className="text-beauty-charcoal/80 text-sm leading-relaxed flex-1 mb-4 italic">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-beauty-blush/40">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-beauty-rose to-beauty-fuchsia flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {review.client_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-beauty-charcoal">
                          {review.client_name}
                        </p>
                        <p className="text-xs text-beauty-warm">
                          {new Date(review.created_at).toLocaleDateString('ro-RO', {
                            month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Star className="w-16 h-16 text-beauty-blush-soft mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold mb-2">
                Fii prima care lasa o recenzie!
              </h3>
              <p className="text-beauty-warm text-sm mb-6">
                Ne-ar placea sa auzim despre experienta ta.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Lasa o Recenzie
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Google Reviews Link */}
      <section className="py-16 relative">
        <div className="absolute inset-0 luxe-pattern -z-10" />
        <div className="container-beauty">
          <Reveal>
            <div className="card-glass text-center py-12 px-8 bg-gradient-to-br from-beauty-rose-light/40 to-beauty-blush-soft/40 border border-beauty-blush/30">
              <Star className="w-8 h-8 text-beauty-rose mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">
                Ne poti lasa si o recenzie pe Google
              </h3>
              <p className="text-beauty-warm mb-6 max-w-lg mx-auto">
                Recenziile Google ne ajuta enorm! Daca ai avut o experienta frumoasa,
                lasa-ne si o recenzie pe Google Maps.
              </p>
              <a
                href="https://g.page/r/beautyspotanne/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Recenzie pe Google
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
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=400&fit=crop"
                alt="Beauty experience"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-beauty-rose/90 via-beauty-fuchsia/85 to-beauty-rosegold/90" />
              <div className="relative text-center py-16 px-8">
                <Calendar className="w-8 h-8 text-white/80 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 text-white">
                  Vrei si tu o experienta de 5 stele?
                </h3>
                <p className="text-white/80 mb-6 max-w-lg mx-auto">
                  Programeaza-ti vizita si vei descoperi de ce clientele noastre ne iubesc.
                </p>
                <Link href="/booking" className="bg-white text-beauty-rose hover:bg-beauty-cream font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Programeaza-te Acum
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
