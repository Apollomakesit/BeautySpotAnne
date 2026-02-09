'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Sparkles, Check, ChevronRight, ChevronLeft, Clock,
  User, Phone, Mail, FileText, Calendar as CalendarIcon,
  CreditCard, Star, Shield, Loader2
} from 'lucide-react'
import clsx from 'clsx'

const STEPS = [
  { id: 1, label: 'Serviciu', icon: Sparkles },
  { id: 2, label: 'Data', icon: CalendarIcon },
  { id: 3, label: 'Ora', icon: Clock },
  { id: 4, label: 'Detalii', icon: User },
]

const FALLBACK_SLOTS = ['10:00', '11:30', '13:00', '15:00', '17:00', '18:30']

function getFallbackSlotsForDate(date) {
  const day = date.getDay()
  if (day === 0) return []
  if (day === 6) return FALLBACK_SLOTS.slice(0, 4)
  return FALLBACK_SLOTS
}

export default function BookingContent() {
  const searchParams = useSearchParams()
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(true)

  // Fallback services if API is unavailable
  const FALLBACK_SERVICES = [
    { id: 1, name: 'Extensii Gene Classic', description: 'Aspect natural și elegant cu gene 1:1.', duration_minutes: 120, price: 250, deposit_amount: 100 },
    { id: 2, name: 'Volume 2D‑3D', description: 'Volum controlat cu bucheți de 2‑3 gene.', duration_minutes: 150, price: 300, deposit_amount: 100 },
    { id: 3, name: 'Mega Volume 4D‑6D', description: 'Volum maxim și plin.', duration_minutes: 180, price: 350, deposit_amount: 150 },
    { id: 4, name: 'Lash Lift & Tint', description: 'Gene naturale curbate și colorate.', duration_minutes: 60, price: 180, deposit_amount: 80 },
    { id: 5, name: 'Întreținere 2 Săptămâni', description: 'Completare și reglare la 2 săptămâni.', duration_minutes: 90, price: 150, deposit_amount: 50 },
    { id: 6, name: 'Îndepărtare Gene', description: 'Îndepărtare profesională și sigură.', duration_minutes: 45, price: 80, deposit_amount: 40 },
  ]

  useEffect(() => {
    setServicesLoading(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_URL not set, using fallback services')
      setServices(FALLBACK_SERVICES)
      setServicesLoading(false)
      return
    }
    axios.get(`${apiUrl}/api/services`)
      .then((res) => {
        const data = res.data
        if (data && data.length > 0) {
          setServices(data)
          const preselectedId = searchParams.get('service')
          if (preselectedId) {
            const service = data.find((s) => s.id === parseInt(preselectedId))
            if (service) {
              setSelectedService(service)
              setCurrentStep(2)
            }
          }
        } else {
          setServices(FALLBACK_SERVICES)
        }
      })
      .catch((err) => {
        console.error('Failed to load services:', err)
        setServices(FALLBACK_SERVICES)
        toast.error('Nu s-au putut încărca serviciile de la server. Se afișează lista implicită.')
      })
      .finally(() => setServicesLoading(false))
  }, [searchParams])

  useEffect(() => {
    if (selectedService && selectedDate) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      setSlotsLoading(true)
      if (!apiUrl) {
        setAvailableSlots(getFallbackSlotsForDate(selectedDate))
        setSlotsLoading(false)
        return
      }
      const dateStr = selectedDate.toISOString().split('T')[0]
      axios
        .get(`${apiUrl}/api/availability/slots/${selectedService.id}/${dateStr}`)
        .then((res) => setAvailableSlots(res.data.slots))
        .catch(() => setAvailableSlots([]))
        .finally(() => setSlotsLoading(false))
    }
  }, [selectedService, selectedDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) {
        await new Promise((resolve) => setTimeout(resolve, 1200))
        toast.success('Programarea ta a fost inregistrata. Te contactam pentru confirmare.')
        setLoading(false)
        return
      }

      const response = await axios.post(`${apiUrl}/api/bookings/`, {
        service_id: selectedService.id,
        booking_date: selectedDate.toISOString().split('T')[0],
        booking_time: selectedSlot,
        ...formData,
      })

      if (response.data.checkout_url) {
        toast.success('Redirecționare către plată...')
        window.location.href = response.data.checkout_url
        return
      }
      toast.success('Programarea a fost creata cu succes.')
      setLoading(false)
    } catch (error) {
      toast.error('Eroare la creare programare. Vă rugăm încercați din nou.')
      setLoading(false)
    }
  }

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4))
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!selectedService
      case 2: return !!selectedDate
      case 3: return !!selectedSlot
      case 4: return formData.client_name && formData.client_phone && formData.client_email
      default: return false
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ═══════ PAGE HERO ═══════ */}
      <section className="relative pt-32 pb-12 dot-pattern">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-beauty-rose/10 rounded-full blur-[120px] -z-10" />
        <div className="container-beauty text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge mb-4 inline-flex">
              <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
              Programare Online
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Programează-ți <span className="gradient-text">Vizita</span>
            </h1>
            <p className="section-subheading">
              Alege serviciul, data și ora — simplu, rapid. Plătești doar avansul online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <section className="pb-20">
        <div className="container-beauty">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ─── LEFT: Wizard ─── */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="card mb-8">
                <div className="flex items-center justify-between">
                  {STEPS.map((step, idx) => (
                    <div key={step.id} className="flex items-center flex-1 last:flex-initial">
                      <button
                        onClick={() => {
                          if (step.id < currentStep) setCurrentStep(step.id)
                        }}
                        className={clsx(
                          'flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300',
                          currentStep === step.id && 'bg-beauty-rose/10',
                          step.id < currentStep && 'cursor-pointer hover:bg-beauty-rose/5',
                          step.id > currentStep && 'cursor-default'
                        )}
                      >
                        <div
                          className={clsx(
                            'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 text-sm font-semibold',
                            currentStep === step.id && 'bg-beauty-rose text-white shadow-beauty',
                            step.id < currentStep && 'bg-beauty-sage text-white',
                            step.id > currentStep && 'bg-beauty-cream-dark text-gray-400'
                          )}
                        >
                          {step.id < currentStep ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <step.icon className="w-4 h-4" />
                          )}
                        </div>
                        <span
                          className={clsx(
                            'text-sm font-medium hidden sm:block',
                            currentStep === step.id ? 'text-beauty-charcoal' : 'text-gray-400'
                          )}
                        >
                          {step.label}
                        </span>
                      </button>
                      {idx < STEPS.length - 1 && (
                        <div className="flex-1 mx-2">
                          <div className="h-0.5 rounded-full bg-beauty-cream-dark">
                            <div
                              className="h-full bg-beauty-rose rounded-full transition-all duration-500"
                              style={{ width: step.id < currentStep ? '100%' : '0%' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ── STEP 1: Service Selection ── */}
                  {currentStep === 1 && (
                    <div className="card">
                      <h2 className="text-2xl font-display font-bold mb-2">Alege Serviciul</h2>
                      <p className="text-gray-500 text-sm mb-6">Selectează tratamentul dorit din lista de mai jos.</p>

                      {servicesLoading ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-2xl bg-beauty-cream animate-pulse h-32" />
                          ))}
                        </div>
                      ) : services.length === 0 ? (
                        <div className="text-center py-12">
                          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">Nu sunt servicii disponibile momentan.</p>
                        </div>
                      ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => setSelectedService(service)}
                            className={clsx(
                              'text-left p-5 rounded-2xl border-2 transition-all duration-300 group',
                              selectedService?.id === service.id
                                ? 'border-beauty-rose bg-beauty-rose/5 shadow-beauty'
                                : 'border-beauty-cream-dark hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02]'
                            )}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-beauty-charcoal group-hover:text-beauty-rose transition-colors">
                                {service.name}
                              </h3>
                              <div
                                className={clsx(
                                  'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                                  selectedService?.id === service.id
                                    ? 'border-beauty-rose bg-beauty-rose'
                                    : 'border-gray-300'
                                )}
                              >
                                {selectedService?.id === service.id && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {service.duration_minutes} min
                              </span>
                              <span className="font-display font-bold text-beauty-rose text-base">
                                {service.price} RON
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                      )}
                    </div>
                  )}

                  {/* ── STEP 2: Date Selection ── */}
                  {currentStep === 2 && (
                    <div className="card">
                      <h2 className="text-2xl font-display font-bold mb-2">Alege Data</h2>
                      <p className="text-gray-500 text-sm mb-6">
                        Selectează o zi din calendar. Zilele disponibile sunt afișate activ.
                      </p>

                      <div className="flex justify-center">
                        <div className="w-full max-w-md">
                          <Calendar
                            onChange={(date) => {
                              setSelectedDate(date)
                              setSelectedSlot('')
                            }}
                            value={selectedDate}
                            minDate={new Date()}
                            className="w-full"
                            locale="ro-RO"
                          />
                        </div>
                      </div>

                      {selectedDate && (
                        <div className="mt-6 p-4 bg-beauty-rose/5 rounded-2xl text-center">
                          <p className="text-sm text-gray-500">Data selectată:</p>
                          <p className="font-display font-bold text-lg text-beauty-charcoal">
                            {selectedDate.toLocaleDateString('ro-RO', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── STEP 3: Time Selection ── */}
                  {currentStep === 3 && (
                    <div className="card">
                      <h2 className="text-2xl font-display font-bold mb-2">Alege Ora</h2>
                      <p className="text-gray-500 text-sm mb-6">Selectează un interval orar disponibil.</p>

                      {slotsLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="w-6 h-6 text-beauty-rose animate-spin" />
                          <span className="ml-3 text-gray-500">Se încarcă intervalele...</span>
                        </div>
                      ) : availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={clsx(
                                'py-3.5 px-4 rounded-2xl text-sm font-semibold border-2 transition-all duration-300',
                                selectedSlot === slot
                                  ? 'bg-beauty-rose text-white border-beauty-rose shadow-beauty'
                                  : 'border-beauty-cream-dark text-beauty-charcoal hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02]'
                              )}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">Nu sunt intervale disponibile pentru această zi.</p>
                          <button onClick={prevStep} className="btn-secondary mt-4 text-sm">
                            Alege altă dată
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── STEP 4: Contact Details ── */}
                  {currentStep === 4 && (
                    <div className="card">
                      <h2 className="text-2xl font-display font-bold mb-2">Datele Tale</h2>
                      <p className="text-gray-500 text-sm mb-6">
                        Completează informațiile de contact pentru confirmarea programării.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Nume complet</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="ex. Maria Popescu"
                              required
                              value={formData.client_name}
                              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                              className="input-beauty !pl-11"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Telefon</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="tel"
                              placeholder="ex. 0721 234 567"
                              required
                              value={formData.client_phone}
                              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                              className="input-beauty !pl-11"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              placeholder="ex. maria@email.com"
                              required
                              value={formData.client_email}
                              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                              className="input-beauty !pl-11"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">
                            Mențiuni speciale <span className="text-gray-400">(opțional)</span>
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                            <textarea
                              placeholder="Alergii, preferințe sau alte detalii..."
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              className="textarea-beauty !pl-11"
                              rows="3"
                            />
                          </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-4 pt-2">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Shield className="w-3.5 h-3.5 text-beauty-sage" /> Plată securizată
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Star className="w-3.5 h-3.5 text-beauty-gold" /> Confirmare instantanee
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading || !canProceed()}
                          className="btn-gold w-full flex items-center justify-center gap-2 !py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Se procesează...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5" />
                              Plătește Avans ({selectedService?.deposit_amount} RON)
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={clsx(
                      'flex items-center gap-2 py-3 px-6 rounded-full font-medium transition-all duration-300',
                      currentStep === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-beauty-charcoal hover:bg-beauty-cream-dark/50'
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Înapoi
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuă
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* ─── RIGHT: Summary Sidebar ─── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="card-glass">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-beauty-cream-dark/50">
                    <div className="w-10 h-10 rounded-xl bg-beauty-rose/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-beauty-rose" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">Sumar</h3>
                      <p className="text-xs text-gray-400">Detalii programare</p>
                    </div>
                  </div>

                  {selectedService ? (
                    <div className="space-y-5">
                      {/* Service */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4 text-beauty-rose" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Serviciu</p>
                          <p className="font-semibold text-sm">{selectedService.name}</p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-beauty-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Clock className="w-4 h-4 text-beauty-gold" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Durată</p>
                          <p className="font-semibold text-sm">{selectedService.duration_minutes} minute</p>
                        </div>
                      </div>

                      {/* Date */}
                      {currentStep >= 2 && selectedDate && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-beauty-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CalendarIcon className="w-4 h-4 text-beauty-sage" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Data</p>
                            <p className="font-semibold text-sm">
                              {selectedDate.toLocaleDateString('ro-RO', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'long',
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Time */}
                      {selectedSlot && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-beauty-blush/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Clock className="w-4 h-4 text-beauty-rose-dark" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Ora</p>
                            <p className="font-semibold text-sm">{selectedSlot}</p>
                          </div>
                        </div>
                      )}

                      {/* Price Breakdown */}
                      <div className="pt-4 mt-4 border-t border-beauty-cream-dark/50 space-y-2.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Preț total</span>
                          <span className="font-semibold">{selectedService.price} RON</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Avans online</span>
                          <span className="font-display font-bold text-beauty-gold text-base">
                            {selectedService.deposit_amount} RON
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Rest la salon</span>
                          <span className="font-semibold text-beauty-charcoal">
                            {selectedService.price - selectedService.deposit_amount} RON
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Sparkles className="w-10 h-10 text-beauty-cream-dark mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">
                        Alege un serviciu pentru a începe
                      </p>
                    </div>
                  )}
                </div>

                {/* Trust section */}
                <div className="mt-6 p-4 rounded-2xl bg-beauty-cream-dark/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-beauty-sage" />
                    <span className="font-semibold text-sm">Garantia Noastră</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-500">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-beauty-sage" />
                      Anulare gratuită cu 24h înainte
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-beauty-sage" />
                      Plată securizată prin Stripe
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-beauty-sage" />
                      Confirmare instantanee pe email
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
