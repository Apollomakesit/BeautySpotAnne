'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function ServiciiPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
      .then(res => setServices(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Serviciile Noastre</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div key={service.id} className="card">
            {service.image_url && (
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            )}
            <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Durată:</span>
                <span className="font-semibold">{service.duration_minutes} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Preț:</span>
                <span className="font-bold text-beauty-rose text-xl">{service.price} RON</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avans:</span>
                <span className="font-semibold">{service.deposit_amount} RON</span>
              </div>
            </div>
            
            <Link href={`/booking?service=${service.id}`} className="btn-primary w-full text-center">
              Rezervă Acum
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
