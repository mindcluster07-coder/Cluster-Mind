import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Dumbbell, Flower2, Home as HomeIcon, Laptop, Shirt } from 'lucide-react'

const items = [
  { name: 'Electronics', icon: Laptop, img: 'https://picsum.photos/seed/cat-electronics/400/400', color: 'from-indigo-500 to-blue-500' },
  { name: 'Fashion', icon: Shirt, img: 'https://picsum.photos/seed/cat-fashion/400/400', color: 'from-rose-500 to-pink-500' },
  { name: 'Home', icon: HomeIcon, img: 'https://picsum.photos/seed/cat-home/400/400', color: 'from-emerald-500 to-teal-500' },
  { name: 'Beauty', icon: Flower2, img: 'https://picsum.photos/seed/cat-beauty/400/400', color: 'from-fuchsia-500 to-purple-500' },
  { name: 'Sports', icon: Dumbbell, img: 'https://picsum.photos/seed/cat-sports/400/400', color: 'from-orange-500 to-amber-500' },
  { name: 'Books', icon: BookOpen, img: 'https://picsum.photos/seed/cat-books/400/400', color: 'from-cyan-500 to-sky-500' },
]

export default function CategoryGrid({ onSelect }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Shop by Category</h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((c, i) => (
          <motion.button
            key={c.name}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            onClick={() => onSelect(c.name)}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${c.color}`}>
                  <c.icon className="h-4 w-4 text-white" />
                </span>
                <span className="text-sm font-semibold text-white">{c.name}</span>
              </div>
              <ArrowRight className="absolute right-3 top-3 h-5 w-5 text-white opacity-0 transition group-hover:opacity-100" />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
