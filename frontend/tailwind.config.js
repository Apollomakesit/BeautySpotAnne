/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ─── Primary Pinks ─── */
        'beauty-rose': '#E8788A',
        'beauty-rose-dark': '#D45B6F',
        'beauty-rose-light': '#FDE8EC',
        'beauty-rose-deep': '#C4405A',
        /* ─── Hot Pink / Fuchsia accents ─── */
        'beauty-fuchsia': '#E84A8A',
        'beauty-fuchsia-light': '#F9D1E1',
        /* ─── Blush & Soft Pinks ─── */
        'beauty-blush': '#FBBFD0',
        'beauty-blush-soft': '#FEE5ED',
        'beauty-petal': '#FFD6E0',
        /* ─── Rose Gold Luxe ─── */
        'beauty-gold': '#D4A373',
        'beauty-gold-light': '#E8CFA8',
        'beauty-rosegold': '#E8B4B8',
        'beauty-rosegold-dark': '#C99DA2',
        /* ─── Cream & Neutral Backgrounds ─── */
        'beauty-cream': '#FFF5F7',
        'beauty-cream-dark': '#F5E6EA',
        'beauty-ivory': '#FFFBFC',
        /* ─── Dark & Contrast ─── */
        'beauty-charcoal': '#2D2028',
        'beauty-warm': '#8B6B6E',
        /* ─── Sage & Complement ─── */
        'beauty-sage': '#A8B5A0',
        'beauty-mauve': '#C4A1A8',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'accent': ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 120, 138, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 120, 138, 0.5), 0 0 80px rgba(232, 120, 138, 0.2)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(110deg, transparent 25%, rgba(212,163,115,0.15) 50%, transparent 75%)',
        'pink-shimmer': 'linear-gradient(110deg, transparent 25%, rgba(232,120,138,0.15) 50%, transparent 75%)',
        'luxe-gradient': 'linear-gradient(135deg, #FFD6E0, #FDE8EC, #FBBFD0, #E8B4B8)',
        'hero-gradient': 'linear-gradient(135deg, #FFF5F7 0%, #FDE8EC 30%, #FFD6E0 60%, #FBBFD0 100%)',
      },
      boxShadow: {
        'beauty': '0 4px 20px rgba(232, 120, 138, 0.12)',
        'beauty-lg': '0 8px 40px rgba(232, 120, 138, 0.18)',
        'beauty-xl': '0 12px 60px rgba(232, 120, 138, 0.22)',
        'gold': '0 4px 20px rgba(212, 163, 115, 0.15)',
        'pink-glow': '0 0 30px rgba(232, 120, 138, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(232, 120, 138, 0.08)',
        'luxe': '0 20px 60px -15px rgba(232, 120, 138, 0.3)',
        'card-hover': '0 24px 80px -15px rgba(232, 120, 138, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
