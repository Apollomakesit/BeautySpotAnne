import Link from 'next/link'
import { Crown, MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart, Sparkles, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-beauty-charcoal text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-beauty-rose via-beauty-fuchsia to-beauty-rosegold" />

      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-beauty-rose/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-beauty-fuchsia/5 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-beauty-rosegold/3 rounded-full blur-[150px]" />

      {/* Newsletter / CTA Banner */}
      <div className="relative container-beauty -mt-0">
        <div className="relative bg-gradient-to-r from-beauty-rose via-beauty-fuchsia to-beauty-rosegold rounded-b-3xl px-8 py-10 text-center overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative z-10">
            <Sparkles className="w-6 h-6 text-white/80 mx-auto mb-3" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Fii Prima Care Afla Noutatile
            </h3>
            <p className="text-white/80 text-sm mb-5 max-w-md mx-auto">
              Oferte speciale, sfaturi beauty si noutati direct in inbox-ul tau.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 border border-white/30 focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all"
              />
              <button className="px-6 py-3 bg-white text-beauty-rose font-semibold rounded-full hover:bg-beauty-cream transition-all duration-300 hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2">
                Aboneaza-te
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container-beauty pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-beauty-rose via-beauty-fuchsia to-beauty-rosegold flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white">
                  Beauty<span className="text-beauty-rose">Spot</span>
                </span>
                <span className="block text-[10px] font-medium text-beauty-rosegold tracking-[0.2em] uppercase -mt-1">
                  by Anne
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Salon premium de extensii gene si tratamente beauty.
              Frumusetea naturala, amplificata cu maiestrie si pasiune.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/beautyspotanne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-gradient-to-br hover:from-beauty-rose/30 hover:to-beauty-fuchsia/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group border border-white/10 hover:border-beauty-rose/30"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-beauty-rose transition-colors" />
              </a>
              <a
                href="https://facebook.com/beautyspotanne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-gradient-to-br hover:from-beauty-rose/30 hover:to-beauty-fuchsia/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group border border-white/10 hover:border-beauty-rose/30"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-beauty-rose transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-beauty-rose to-beauty-fuchsia rounded-full" />
              Navigare
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Acasa' },
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
            <h4 className="font-display font-semibold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-beauty-fuchsia to-beauty-rosegold rounded-full" />
              Servicii
            </h4>
            <ul className="space-y-3">
              {[
                'Extensii Gene Classic',
                'Volume 2D-6D',
                'Mega Volume',
                'Lash Lift & Tint',
                'Indepartare Gene',
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
            <h4 className="font-display font-semibold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-beauty-rosegold to-beauty-gold rounded-full" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-beauty-rose" />
                </div>
                <span className="text-gray-400 text-sm">
                  Bucuresti, Romania
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-beauty-rose" />
                </div>
                <a href="tel:+40XXXXXXXXX" className="text-gray-400 hover:text-beauty-rose text-sm transition-colors">
                  +40 XXX XXX XXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-beauty-rose" />
                </div>
                <a href="mailto:contact@beautyspotanne.ro" className="text-gray-400 hover:text-beauty-rose text-sm transition-colors">
                  contact@beautyspotanne.ro
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-beauty-rose" />
                </div>
                <div className="text-gray-400 text-sm">
                  <p>Luni - Vineri: 10:00 - 20:00</p>
                  <p>Sambata: 10:00 - 16:00</p>
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
              Creat cu <Heart className="w-3.5 h-3.5 text-beauty-rose fill-beauty-rose inline-block animate-pulse-soft" /> in Bucuresti
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
