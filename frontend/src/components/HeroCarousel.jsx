import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    badge: 'Deal of the Day',
    title: 'Up to 60% Off Electronics',
    sub: 'Headphones, smart watches, TVs and more.',
    cta: 'Shop Electronics',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/deal1/600/600',
    from: 'from-indigo-700',
    to: 'to-purple-700',
  },
  {
    id: 2,
    badge: 'New Season',
    title: 'Fashion Sale — 50% Off',
    sub: 'Trendy styles for everyone.',
    cta: 'Shop Fashion',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/deal2/600/600',
    from: 'from-rose-600',
    to: 'to-orange-500',
  },
  {
    id: 3,
    badge: 'Best Prices',
    title: 'Home & Kitchen Essentials',
    sub: 'Everything to upgrade your home.',
    cta: 'Shop Home',
    category: 'Home',
    image: 'https://picsum.photos/seed/deal3/600/600',
    from: 'from-emerald-600',
    to: 'to-teal-600',
  },
]

export default function HeroCarousel({ onShop }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  const slide = slides[index]

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 flex items-center bg-gradient-to-r ${slide.from} ${slide.to}`}
          >
            <div className="relative z-10 max-w-md p-8 sm:p-12">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {slide.badge}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                {slide.title}
              </h2>
              <p className="mt-3 text-sm text-white/80 sm:text-base">{slide.sub}</p>
              <button
                type="button"
                onClick={() => onShop(slide.category)}
                className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100"
              >
                {slide.cta}
              </button>
            </div>
            <img
              src={slide.image}
              alt={slide.title}
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
