/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Pink girlish luxurious palette */
        'beauty-rose': '#E8A0B8',
        'beauty-rose-dark': '#D17A96',
        'beauty-rose-light': '#F5D0DC',
        'beauty-gold': '#D4AF37',
        'beauty-gold-light': '#F0E0B0',
        'beauty-cream': '#FFF9F7',
        'beauty-cream-dark': '#FBF0ED',
        'beauty-charcoal': '#2C2426',
        'beauty-warm': '#B8866B',
        'beauty-blush': '#FFE4E1',
        'beauty-sage': '#B8A99A',
        'beauty-pink': '#FFC0CB',
        'beauty-champagne': '#F7E7CE',
      },
      fontFamily: {
        'display': ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(110deg, transparent 25%, rgba(212,175,55,0.2) 50%, transparent 75%)',
        'pink-luxury': 'linear-gradient(135deg, #FFF9F7 0%, #FBF0ED 50%, #FFF0F5 100%)',
      },
      boxShadow: {
        'beauty': '0 4px 24px rgba(232, 160, 184, 0.18)',
        'beauty-lg': '0 12px 48px rgba(232, 160, 184, 0.22)',
        'beauty-xl': '0 20px 60px rgba(232, 160, 184, 0.28)',
        'gold': '0 4px 24px rgba(212, 175, 55, 0.2)',
        'inner-glow': 'inset 0 0 24px rgba(232, 160, 184, 0.08)',
        'luxury': '0 25px 50px -12px rgba(232, 160, 184, 0.15)',
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
