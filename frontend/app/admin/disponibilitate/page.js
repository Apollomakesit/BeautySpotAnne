'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DAYS = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică']

export default function DisponibilitatePage() {
  const [availability, setAvailability] = useState([])
  const [form, setForm] = useState({ day_of_week: 0, start_time: '10:00', end_time: '18:00' })

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/availability`)
      .then(res => setAvailability(res.data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/availability/`, form)
      fetchAvailability()
      alert('Disponibilitate adăugată!')
    } catch (error) {
      alert('Eroare: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Ștergi acest interval?')) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/availability/${id}`)
      fetchAvailability()
    } catch (error) {
      alert('Eroare: ' + error.message)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestionează Disponibilitate</h1>

      {/* Current Availability */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Intervale Curente</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Zi</th>
              <th className="text-left p-3">Interval</th>
              <th className="text-left p-3">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {availability.map(slot => (
              <tr key={slot.id} className="border-b">
                <td className="p-3">{DAYS[slot.day_of_week]}</td>
                <td className="p-3">{slot.start_time} - {slot.end_time}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Availability */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Adaugă Interval</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Zi:</label>
            <select
              value={form.day_of_week}
              onChange={(e) => setForm({...form, day_of_week: parseInt(e.target.value)})}
              className="w-full p-3 border rounded-lg"
            >
              {DAYS.map((day, idx) => (
                <option key={idx} value={idx}>{day}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Ora Start:</label>
              <input
                type="time"
                value={form.start_time}
                onChange={(e) => setForm({...form, start_time: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Ora Sfârșit:</label>
              <input
                type="time"
                value={form.end_time}
                onChange={(e) => setForm({...form, end_time: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Adaugă Interval
          </button>
        </form>
      </div>
    </div>
  )
}
