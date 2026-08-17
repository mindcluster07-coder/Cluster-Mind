import { Link } from 'react-router-dom'
import { LogIn, Search, ShoppingCart, ShoppingBag } from 'lucide-react'
import { categories } from '../data/products'
import { useCart } from '../context/CartContext'

export default function Header({ search, onSearchChange }) {
  const { count, setIsOpen } = useCart()

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <ShoppingBag className="h-5 w-5 text-white" />
            </span>
            <span className="hidden text-lg font-bold tracking-tight sm:block">
              ShopSmart
            </span>
          </a>

          <div className="flex flex-1 items-center overflow-hidden rounded-full bg-white">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands and more..."
              className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 outline-none"
            />
            <button
              type="button"
              aria-label="Search"
              className="flex h-full items-center bg-orange-400 px-4 py-2.5 text-slate-900 transition hover:bg-orange-500"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/register"
              className="hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10 sm:flex"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-white/10"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden md:inline">Cart</span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-xs font-bold text-slate-900">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 text-slate-200">
        <nav className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-2.5 text-sm sm:px-6 lg:px-8">
          <a href="#products" className="whitespace-nowrap font-semibold text-white">
            All
          </a>
          {categories
            .filter((c) => c !== 'All')
            .map((c) => (
              <a
                key={c}
                href="#products"
                className="whitespace-nowrap transition hover:text-white"
              >
                {c}
              </a>
            ))}
        </nav>
      </div>
    </header>
  )
}
