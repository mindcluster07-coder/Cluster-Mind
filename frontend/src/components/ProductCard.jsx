import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const filled = Math.round(product.rating)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-10 text-sm font-medium text-slate-800">
        {product.name}
      </h3>

      <div className="mt-1.5 flex items-center gap-1.5">
        <div className="flex" aria-label={`${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < filled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-200 text-slate-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
        <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
        {product.oldPrice && (
          <span className="text-xs text-slate-400 line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-xs font-medium text-green-700">In Stock</p>

      <button
        type="button"
        onClick={() => addToCart(product)}
        className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-orange-400 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-orange-500"
      >
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>
    </motion.div>
  )
}
