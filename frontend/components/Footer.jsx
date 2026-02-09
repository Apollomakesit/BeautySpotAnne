import Link from 'next/link'
import { Crown, MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart, Sparkles, ArrowRight, Star, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-beauty-charcoal text-white overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-beauty-rose via-beauty-fuchsia to-beauty-rosegold" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-beauty-rose/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-beauty-fuchsia/5 rounded-full blur-[80px]" />

      {/* Newsletter Banner */}
      <div className="relative container-beauty">
        <div className="relative bg-gradient-to-r from-beauty-rose via-beauty-fuchsia to-beauty-rosegold rounded-b-3xl px-8 py-10 text-center overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative z-10">
            <Sparkles className="w-6 h-6 text-white/80 mx-auto mb-3" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">Programeaza-te Online</h3>
            <p className="text-white/80 text-sm mb-5 max-w-md mx-auto">Extensii gene de la 130 lei. Platesti doar 50% avans online, restul la salon.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/booking" className="px-6 py-3 bg-white text-beauty-rose font-semibold rounded-full hover:bg-beauty-cream transition-all duration-300 hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2">
                Programare Online <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/40760089809?text=Buna%20ziua!%20As%20dori%20sa%20fac%20o%20programare." target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-all duration-300 hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container-beauty pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-beauty-rose via-beauty-fuchsia to-beauty-rosegold flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white">Beauty<span className="text-beauty-rose">Spot</span></span>
                <span className="block text-[10px] font-medium text-beauty-rosegold tracking-[0.2em] uppercase -mt-1">by Anne</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Extensii gene profesionale si servicii sprancene. De la Classic 1D la Mega Volume - frumusetea naturala amplificata cu maiestrie.</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/beautyspotanne/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-gradient-to-br hover:from-beauty-rose/30 hover:to-beauty-fuchsia/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group border border-white/10 hover:border-beauty-rose/30">
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-beauty-rose transition-colors" />
              </a>
              <a href="https://wa.me/40760089809" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-[#25D366]/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group border border-white/10 hover:border-[#25D366]/30">
                <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-beauty-rose to-beauty-fuchsia rounded-full" />Navigare
            </h4>
            <ul className="space-y-3">
              {[{ href: '/', label: 'Acasa' }, { href: '/servicii', label: 'Servicii & Preturi' }, { href: '/booking', label: 'Programare Online' }, { href: '/recenzii', label: 'Recenzii' }, { href: '/contact', label: 'Contact' }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-beauty-rose text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-beauty-rose transition-all duration-300" />{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-beauty-fuchsia to-beauty-rosegold rounded-full" />Servicii
            </h4>
            <ul className="space-y-3">
              {['Classic 1D - 130 lei', 'Volume 2D-4D', 'Russian Volume - 250 lei', 'Mega Volume - 280 lei', 'Whispy Volume - 270 lei', 'Foxy Eyeliner - 250 lei', 'Stilizat Sprancene - 60 lei'].map((service) => (
                <li key={service}>
                  <Link href="/servicii" className="text-gray-400 hover:text-beauty-rose text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-beauty-rose transition-all duration-300" />{service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-beauty-rosegold to-beauty-gold rounded-full" />Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin className="w-4 h-4 text-beauty-rose" /></div>
                <span className="text-gray-400 text-sm">Bucuresti, Sector 2<br />Zona Teiul Doamnei</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Phone className="w-4 h-4 text-beauty-rose" /></div>
                <a href="tel:0760089809" className="text-gray-400 hover:text-beauty-rose text-sm transition-colors">0760 089 809</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Mail className="w-4 h-4 text-beauty-rose" /></div>
                <a href="mailto:e.llyyy@yahoo.com" className="text-gray-400 hover:text-beauty-rose text-sm transition-colors">e.llyyy@yahoo.com</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-beauty-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5"><Clock className="w-4 h-4 text-beauty-rose" /></div>
                <div className="text-gray-400 text-sm"><p>Luni - Vineri: 10:00 - 20:00</p><p>Sambata: 10:00 - 16:00</p></div>
              </li>
            </ul>
            {/* Google Review in footer */}
            <div className="mt-6">
              <a href="https://g.page/r/beautyspotanne/review" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-beauty-rosegold hover:text-beauty-rose transition-colors">
                <Star className="w-4 h-4" /> Lasa o recenzie Google
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} BeautySpot Anne. Toate drepturile rezervate.</p>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">Creat cu <Heart className="w-3.5 h-3.5 text-beauty-rose fill-beauty-rose inline-block animate-pulse-soft" /> in Bucuresti</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
