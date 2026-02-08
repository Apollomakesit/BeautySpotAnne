'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function BookingContent() {
  const searchParams = useSearchParams()
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
      .then(res => {
        setServices(res.data)
        const preselectedId = searchParams.get('service')
        if (preselectedId) {
          const service = res.data.find(s => s.id === parseInt(preselectedId))
          setSelectedService(service)
        }
      })
  }, [searchParams])

  useEffect(() => {
    if (selectedService && selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/availability/slots/${selectedService.id}/${dateStr}`)
        .then(res => setAvailableSlots(res.data.slots))
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
        ...formData
      })

      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url
      }
    } catch (error) {
      alert('Eroare la creare programare: ' + error.message)
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Programează-te</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Booking Form */}
        <div>
          {/* Step 1: Select Service */}
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">1. Alege Serviciul</h2>
            <select
              value={selectedService?.id || ''}
              onChange={(e) => {
                const service = services.find(s => s.id === parseInt(e.target.value))
                setSelectedService(service)
              }}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Selectează un serviciu</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {s.price} RON</option>
              ))}
            </select>
            
            {selectedService && (
              <div className="mt-4 p-4 bg-beauty-cream rounded-lg">
                <p><strong>Durată:</strong> {selectedService.duration_minutes} min</p>
                <p><strong>Preț:</strong> {selectedService.price} RON</p>
                <p><strong>Avans (online):</strong> {selectedService.deposit_amount} RON</p>
              </div>
            )}
          </div>

          {/* Step 2: Select Date */}
          {selectedService && (
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">2. Alege Data</h2>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
                className="w-full"
              />
            </div>
          )}

          {/* Step 3: Select Time */}
          {selectedService && selectedDate && (
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">3. Alege Ora</h2>
              <div className="grid grid-cols-3 gap-3">
                {availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-lg border-2 transition ${
                      selectedSlot === slot
                        ? 'bg-beauty-rose text-white border-beauty-rose'
                        : 'border-gray-300 hover:border-beauty-rose'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {availableSlots.length === 0 && (
                <p className="text-gray-500 text-center">Nu sunt intervale disponibile</p>
              )}
            </div>
          )}

          {/* Step 4: Contact Details */}
          {selectedSlot && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">4. Datele Tale</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nume complet"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  required
                  value={formData.client_phone}
                  onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.client_email}
                  onChange={(e) => setFormData({...formData, client_email: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                <textarea
                  placeholder="Mențiuni speciale (opțional)"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Se procesează...' : `Plătește Avans (${selectedService.deposit_amount} RON)`}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div>
          <div className="card sticky top-24">
            <h3 className="text-2xl font-bold mb-6">Sumar Programare</h3>
            
            {selectedService ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Serviciu</p>
                  <p className="font-semibold text-lg">{selectedService.name}</p>
                </div>
                
                {selectedDate && (
                  <div>
                    <p className="text-gray-600">Data</p>
                    <p className="font-semibold">{selectedDate.toLocaleDateString('ro-RO')}</p>
                  </div>
                )}
                
                {selectedSlot && (
                  <div>
                    <p className="text-gray-600">Ora</p>
                    <p className="font-semibold">{selectedSlot}</p>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Preț total:</span>
                    <span className="font-bold">{selectedService.price} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avans online:</span>
                    <span className="font-bold text-beauty-rose">{selectedService.deposit_amount} RON</span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Rest la salon:</span>
                    <span>{selectedService.price - selectedService.deposit_amount} RON</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Alege un serviciu pentru a începe</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
