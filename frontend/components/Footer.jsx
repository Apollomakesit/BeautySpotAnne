import Link from 'next/link'
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-beauty-charcoal text-white overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beauty-rose/40 to-transparent" />
      
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-beauty-rose/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-beauty-gold/5 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="relative container-beauty pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-beauty-rose to-beauty-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white">
                  Beauty<span className="text-beauty-rose">Spot</span>
                </span>
                <span className="block text-[10px] font-medium text-beauty-gold tracking-[0.2em] uppercase -mt-1">
                  by Anne
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Salon premium de extensii gene și tratamente beauty. 
              Frumusețea naturală, amplificată cu măiestrie.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/beautyspotanne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-beauty-rose/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-beauty-rose transition-colors" />
              </a>
              <a
                href="https://facebook.com/beautyspotanne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-beauty-rose/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-beauty-rose transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">
              Navigare
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Acasă' },
                { href: '/servicii', label: 'Servicii' },
                { href: '/booking', label: 'Programare Online' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-beauty-rose text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-beauty-rose transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">
              Servicii
            </h4>
            <ul className="space-y-3">
              {[
                'Extensii Gene Classic',
                'Volume 2D-6D',
                'Mega Volume',
                'Lash Lift & Tint',
                'Îndepărtare Gene',
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/servicii"
                    className="text-gray-400 hover:text-beauty-rose text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-beauty-rose transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-beauty-rose" />
                </div>
                <span className="text-gray-400 text-sm">
                  București, România
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-beauty-rose" />
                </div>
                <a href="tel:+40XXXXXXXXX" className="text-gray-400 hover:text-beauty-rose text-sm transition-colors">
                  +40 XXX XXX XXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-beauty-rose" />
                </div>
                <a href="mailto:contact@beautyspotanne.ro" className="text-gray-400 hover:text-beauty-rose text-sm transition-colors">
                  contact@beautyspotanne.ro
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-beauty-rose" />
                </div>
                <div className="text-gray-400 text-sm">
                  <p>Luni - Vineri: 10:00 - 20:00</p>
                  <p>Sâmbătă: 10:00 - 16:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} BeautySpot Anne. Toate drepturile rezervate.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              Creat cu <Heart className="w-3.5 h-3.5 text-beauty-rose fill-beauty-rose" /> în București
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
