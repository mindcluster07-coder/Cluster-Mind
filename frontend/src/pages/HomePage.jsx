import { useMemo, useState } from 'react'
import Header from '../components/Header'
import HeroCarousel from '../components/HeroCarousel'
import CategoryGrid from '../components/CategoryGrid'
import ProductGrid from '../components/ProductGrid'
import CartDrawer from '../components/CartDrawer'
import Footer from '../components/Footer'
import { products } from '../data/products'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCategorySelect = (cat) => {
    setCategory(cat)
    scrollToProducts()
  }

  const handleShop = (cat) => {
    setCategory(cat)
    scrollToProducts()
  }

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    )
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [category, search, sort])

  const heading =
    search || category !== 'All'
      ? 'Search Results'
      : 'Recommended for You'

  return (
    <div id="top" className="min-h-screen bg-slate-100 text-slate-900">
      <Header search={search} onSearchChange={setSearch} />
      <main>
        <HeroCarousel onShop={handleShop} />
        <CategoryGrid onSelect={handleCategorySelect} />
        <ProductGrid
          heading={heading}
          products={filtered}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
        />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
