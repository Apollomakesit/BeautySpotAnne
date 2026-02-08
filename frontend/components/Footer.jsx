import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-beauty-rose">BeautySpot Anne</h3>
            <p className="text-gray-400">Salon profesional de extensii gene și beauty treatments în București.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Link-uri Rapide</h4>
            <ul className="space-y-2">
              <li><Link href="/servicii" className="text-gray-400 hover:text-beauty-rose">Servicii</Link></li>
              <li><Link href="/booking" className="text-gray-400 hover:text-beauty-rose">Programare</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-beauty-rose">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">📍 București, România</p>
            <p className="text-gray-400">📱 +40 XXX XXX XXX</p>
            <p className="text-gray-400">✉️ contact@beautyspotanne.ro</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 BeautySpot Anne. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
