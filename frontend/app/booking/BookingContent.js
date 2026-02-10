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
  CreditCard, ArrowRight, Star, Shield, Loader2, MessageCircle
} from 'lucide-react'
import clsx from 'clsx'
import { FALLBACK_BOOKING_SERVICES } from '@/data/serviceCatalog'

const STEPS = [
  { id: 1, label: 'Serviciu', icon: Sparkles },
  { id: 2, label: 'Data', icon: CalendarIcon },
  { id: 3, label: 'Ora', icon: Clock },
  { id: 4, label: 'Detalii', icon: User },
]

const FALLBACK_SERVICES = FALLBACK_BOOKING_SERVICES

export default function BookingContent() {
  const searchParams = useSearchParams()
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({ client_name: '', client_phone: '', client_email: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(true)

  useEffect(() => {
    setServicesLoading(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) { setServices(FALLBACK_SERVICES); setServicesLoading(false); return }
    axios.get(`${apiUrl}/api/services`)
      .then((res) => {
        const data = res.data
        if (data && data.length > 0) {
          setServices(data)
          const preselectedId = searchParams.get('service')
          if (preselectedId) {
            const service = data.find((s) => s.id === parseInt(preselectedId))
            if (service) { setSelectedService(service); setCurrentStep(2) }
          }
        } else { setServices(FALLBACK_SERVICES) }
      })
      .catch(() => { setServices(FALLBACK_SERVICES) })
      .finally(() => setServicesLoading(false))
  }, [searchParams])

  useEffect(() => {
    if (selectedService && selectedDate) {
      setSlotsLoading(true)
      const dateStr = selectedDate.toISOString().split('T')[0]
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/availability/slots/${selectedService.id}/${dateStr}`)
        .then((res) => setAvailableSlots(res.data.slots))
        .catch(() => setAvailableSlots([]))
        .finally(() => setSlotsLoading(false))
    }
  }, [selectedService, selectedDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/`, {
        service_id: selectedService.id,
        booking_date: selectedDate.toISOString().split('T')[0],
        booking_time: selectedSlot,
        ...formData,
      })
      if (response.data.checkout_url) {
        toast.success('Redirectionare catre plata...')
        window.location.href = response.data.checkout_url
      }
    } catch (error) {
      toast.error('Eroare la creare programare. Va rugam incercati din nou.')
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
      case 4: return formData.client_name && formData.client_phone
      default: return false
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-hero-gradient -z-20" />
        <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />
        <div className="container-beauty text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge mb-4 inline-flex"><CalendarIcon className="w-3.5 h-3.5 mr-1.5" />Programare Online</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">Programeaza-ti <span className="gradient-text">Vizita</span></h1>
            <p className="section-subheading">Alege serviciul, data si ora. Platesti doar 50% avans online, restul la salon.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-beauty">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Wizard */}
            <div className="lg:col-span-2">
              {/* Progress */}
              <div className="card mb-8 border-beauty-blush/30">
                <div className="flex items-center justify-between">
                  {STEPS.map((step, idx) => (
                    <div key={step.id} className="flex items-center flex-1 last:flex-initial">
                      <button onClick={() => { if (step.id < currentStep) setCurrentStep(step.id) }}
                        className={clsx('flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300',
                          currentStep === step.id && 'bg-beauty-rose/10',
                          step.id < currentStep && 'cursor-pointer hover:bg-beauty-rose/5',
                          step.id > currentStep && 'cursor-default')}>
                        <div className={clsx('w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 text-sm font-semibold',
                          currentStep === step.id && 'bg-gradient-to-br from-beauty-rose to-beauty-fuchsia text-white shadow-beauty',
                          step.id < currentStep && 'bg-beauty-sage text-white',
                          step.id > currentStep && 'bg-beauty-blush-soft text-beauty-mauve')}>
                          {step.id < currentStep ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                        </div>
                        <span className={clsx('text-sm font-medium hidden sm:block', currentStep === step.id ? 'text-beauty-charcoal' : 'text-beauty-mauve')}>{step.label}</span>
                      </button>
                      {idx < STEPS.length - 1 && (
                        <div className="flex-1 mx-2"><div className="h-0.5 rounded-full bg-beauty-blush-soft"><div className="h-full bg-gradient-to-r from-beauty-rose to-beauty-fuchsia rounded-full transition-all duration-500" style={{ width: step.id < currentStep ? '100%' : '0%' }} /></div></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {/* STEP 1 */}
                  {currentStep === 1 && (
                    <div className="card border-beauty-blush/30">
                      <h2 className="text-2xl font-display font-bold mb-2">Alege Serviciul</h2>
                      <p className="text-beauty-warm text-sm mb-6">14 servicii disponibile. Avansul este 50% din pret.</p>
                      {servicesLoading ? (
                        <div className="grid sm:grid-cols-2 gap-4">{[1,2,3,4].map((i) => (<div key={i} className="rounded-2xl bg-beauty-cream animate-pulse h-32" />))}</div>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {services.map((service) => (
                            <button key={service.id} onClick={() => setSelectedService(service)}
                              className={clsx('text-left p-4 rounded-2xl border-2 transition-all duration-300 group',
                                selectedService?.id === service.id ? 'border-beauty-rose bg-beauty-rose/5 shadow-beauty' : 'border-beauty-blush-soft hover:border-beauty-rose/40')}>
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-sm text-beauty-charcoal group-hover:text-beauty-rose transition-colors">{service.name}</h3>
                                <div className={clsx('w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                                  selectedService?.id === service.id ? 'border-beauty-rose bg-gradient-to-br from-beauty-rose to-beauty-fuchsia' : 'border-beauty-mauve/40')}>
                                  {selectedService?.id === service.id && <Check className="w-3 h-3 text-white" />}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-beauty-warm">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-beauty-rose" />{service.duration_minutes} min</span>
                                <span className="font-display font-bold text-beauty-rose text-sm">{service.price} lei</span>
                                <span className="text-beauty-mauve">Avans: {service.deposit_amount} lei</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 2 */}
                  {currentStep === 2 && (
                    <div className="card border-beauty-blush/30">
                      <h2 className="text-2xl font-display font-bold mb-2">Alege Data</h2>
                      <p className="text-beauty-warm text-sm mb-6">Selecteaza o zi din calendar.</p>
                      <div className="flex justify-center">
                        <div className="w-full max-w-md">
                          <Calendar onChange={(date) => { setSelectedDate(date); setSelectedSlot('') }} value={selectedDate} minDate={new Date()} className="w-full" locale="ro-RO" />
                        </div>
                      </div>
                      {selectedDate && (
                        <div className="mt-6 p-4 bg-beauty-rose/5 rounded-2xl text-center border border-beauty-blush/30">
                          <p className="text-sm text-beauty-warm">Data selectata:</p>
                          <p className="font-display font-bold text-lg text-beauty-charcoal">
                            {selectedDate.toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3 */}
                  {currentStep === 3 && (
                    <div className="card border-beauty-blush/30">
                      <h2 className="text-2xl font-display font-bold mb-2">Alege Ora</h2>
                      <p className="text-beauty-warm text-sm mb-6">Selecteaza un interval orar disponibil.</p>
                      {slotsLoading ? (
                        <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 text-beauty-rose animate-spin" /><span className="ml-3 text-beauty-warm">Se incarca...</span></div>
                      ) : availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {availableSlots.map((slot) => (
                            <button key={slot} onClick={() => setSelectedSlot(slot)}
                              className={clsx('py-3.5 px-4 rounded-2xl text-sm font-semibold border-2 transition-all duration-300',
                                selectedSlot === slot ? 'bg-gradient-to-r from-beauty-rose to-beauty-fuchsia text-white border-beauty-rose shadow-beauty' : 'border-beauty-blush-soft text-beauty-charcoal hover:border-beauty-rose/40')}>
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <CalendarIcon className="w-12 h-12 text-beauty-blush mx-auto mb-3" />
                          <p className="text-beauty-warm">Nu sunt intervale disponibile pentru aceasta zi.</p>
                          <button onClick={prevStep} className="btn-secondary mt-4 text-sm">Alege alta data</button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4 */}
                  {currentStep === 4 && (
                    <div className="card border-beauty-blush/30">
                      <h2 className="text-2xl font-display font-bold mb-2">Datele Tale</h2>
                      <p className="text-beauty-warm text-sm mb-6">Completeaza informatiile. Email-ul este optional - vei primi confirmare si pe WhatsApp.</p>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-beauty-charcoal mb-2">Nume complet *</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                            <input type="text" placeholder="ex. Maria Popescu" required value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} className="input-beauty !pl-11" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-beauty-charcoal mb-2">Telefon / WhatsApp *</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                            <input type="tel" placeholder="ex. 0721 234 567" required value={formData.client_phone} onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })} className="input-beauty !pl-11" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-beauty-charcoal mb-2">Email <span className="text-beauty-mauve">(optional - pentru confirmare)</span></label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beauty-mauve" />
                            <input type="email" placeholder="ex. maria@email.com" value={formData.client_email} onChange={(e) => setFormData({ ...formData, client_email: e.target.value })} className="input-beauty !pl-11" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-beauty-charcoal mb-2">Mentiuni <span className="text-beauty-mauve">(optional)</span></label>
                          <div className="relative">
                            <FileText className="absolute left-4 top-4 w-4 h-4 text-beauty-mauve" />
                            <textarea placeholder="Alergii, preferinte..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="textarea-beauty !pl-11" rows="3" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-2">
                          <div className="flex items-center gap-1.5 text-xs text-beauty-warm"><Shield className="w-3.5 h-3.5 text-beauty-sage" /> Plata securizata</div>
                          <div className="flex items-center gap-1.5 text-xs text-beauty-warm"><MessageCircle className="w-3.5 h-3.5 text-[#25D366]" /> Confirmare WhatsApp</div>
                          <div className="flex items-center gap-1.5 text-xs text-beauty-warm"><Star className="w-3.5 h-3.5 text-beauty-rose" /> Cont creat automat</div>
                        </div>
                        <button type="submit" disabled={loading || !canProceed()} className="btn-gold w-full flex items-center justify-center gap-2 !py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                          {loading ? (<><Loader2 className="w-5 h-5 animate-spin" />Se proceseaza...</>) : (<><CreditCard className="w-5 h-5" />Plateste Avans ({selectedService?.deposit_amount} lei)</>)}
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {currentStep < 4 && (
                <div className="flex items-center justify-between mt-6">
                  <button onClick={prevStep} disabled={currentStep === 1} className={clsx('flex items-center gap-2 py-3 px-6 rounded-full font-medium transition-all duration-300', currentStep === 1 ? 'text-beauty-blush-soft cursor-not-allowed' : 'text-beauty-warm hover:text-beauty-charcoal hover:bg-beauty-cream-dark/50')}>
                    <ChevronLeft className="w-4 h-4" />Inapoi
                  </button>
                  <button onClick={nextStep} disabled={!canProceed()} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">Continua<ChevronRight className="w-4 h-4" /></button>
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="card-glass border border-beauty-blush/30">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-beauty-blush/30">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-beauty-rose/15 to-beauty-fuchsia/15 flex items-center justify-center"><Sparkles className="w-5 h-5 text-beauty-rose" /></div>
                    <div><h3 className="font-display font-bold text-lg">Sumar</h3><p className="text-xs text-beauty-warm">Detalii programare</p></div>
                  </div>
                  {selectedService ? (
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Sparkles className="w-4 h-4 text-beauty-rose" /></div>
                        <div><p className="text-xs text-beauty-warm">Serviciu</p><p className="font-semibold text-sm">{selectedService.name}</p></div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-beauty-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Clock className="w-4 h-4 text-beauty-gold" /></div>
                        <div><p className="text-xs text-beauty-warm">Durata</p><p className="font-semibold text-sm">{selectedService.duration_minutes} minute</p></div>
                      </div>
                      {currentStep >= 2 && selectedDate && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-beauty-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5"><CalendarIcon className="w-4 h-4 text-beauty-sage" /></div>
                          <div><p className="text-xs text-beauty-warm">Data</p><p className="font-semibold text-sm">{selectedDate.toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric', month: 'long' })}</p></div>
                        </div>
                      )}
                      {selectedSlot && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-beauty-blush/30 flex items-center justify-center flex-shrink-0 mt-0.5"><Clock className="w-4 h-4 text-beauty-rose-dark" /></div>
                          <div><p className="text-xs text-beauty-warm">Ora</p><p className="font-semibold text-sm">{selectedSlot}</p></div>
                        </div>
                      )}
                      <div className="pt-4 mt-4 border-t border-beauty-blush/30 space-y-2.5">
                        <div className="flex justify-between text-sm"><span className="text-beauty-warm">Pret total</span><span className="font-semibold">{selectedService.price} lei</span></div>
                        <div className="flex justify-between text-sm"><span className="text-beauty-warm">Avans 50% online</span><span className="font-display font-bold text-beauty-rose text-base">{selectedService.deposit_amount} lei</span></div>
                        <div className="flex justify-between text-sm"><span className="text-beauty-warm">Rest la salon</span><span className="font-semibold text-beauty-charcoal">{selectedService.price - selectedService.deposit_amount} lei</span></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8"><Sparkles className="w-10 h-10 text-beauty-blush mx-auto mb-3" /><p className="text-beauty-warm text-sm">Alege un serviciu</p></div>
                  )}
                </div>
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-beauty-rose-light/40 to-beauty-blush-soft/40 border border-beauty-blush/20">
                  <div className="flex items-center gap-3 mb-3"><Shield className="w-5 h-5 text-beauty-sage" /><span className="font-semibold text-sm">Garantia Noastra</span></div>
                  <ul className="space-y-2 text-xs text-beauty-warm">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-beauty-sage flex-shrink-0" />Anulare gratuita cu 24h inainte</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-beauty-sage flex-shrink-0" />Plata securizata prin Stripe</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-beauty-sage flex-shrink-0" />Confirmare pe WhatsApp si email</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-beauty-sage flex-shrink-0" />Cont creat automat la programare</li>
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
