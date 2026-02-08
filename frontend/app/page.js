import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-beauty-rose/20 to-beauty-cream">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Privirea Ta Perfectă <span className="text-beauty-rose">Începe Aici</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Extensii de gene profesionale, lash lift și tratamente beauty personalizate în București.
            </p>
            <div className="flex space-x-4">
              <Link href="/booking" className="btn-primary">
                Programează-te Acum
              </Link>
              <Link href="/servicii" className="btn-secondary">
                Vezi Servicii
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Serviciile Noastre</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Extensii Gene Classic', price: '250 RON', duration: '2h' },
            { name: 'Volume 2D-3D', price: '300 RON', duration: '2.5h' },
            { name: 'Lash Lift', price: '180 RON', duration: '1h' },
          ].map((service, idx) => (
            <div key={idx} className="card">
              <div className="h-48 bg-beauty-rose/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>⏱️ {service.duration}</span>
                <span className="font-bold text-beauty-rose">{service.price}</span>
              </div>
              <Link href="/booking" className="btn-primary w-full text-center">
                Rezervă
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">@beautyspotanne</h2>
          <p className="text-center text-gray-600 mb-12">Urmărește-ne pe Instagram pentru inspirație</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-beauty-rose/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
