import { useEffect, useState } from 'react'
import { Plus, Edit3, Trash2, Eye } from 'lucide-react'
import ChartCard from '../../components/marketing/ChartCard'
import Button from '../../components/marketing/Button'
import StatusBadge from '../../components/marketing/StatusBadge'
import SearchBar from '../../components/marketing/SearchBar'
import Modal from '../../components/marketing/Modal'
import { useToast } from '../../components/marketing/Toast'
import { getAdminProducts } from '../../api'
import { PRODUCTS as MOCK_PRODUCTS, CATEGORIES, BRANDS } from '../../data/adminMockData'

export default function AdminProductManagementPage() {
  const { show } = useToast()
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [viewProduct, setViewProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('products')
  const [form, setForm] = useState({ name: '', category: '', brand: '', price: '', stock: '' })
  const [products, setProducts] = useState(MOCK_PRODUCTS)

  useEffect(() => {
    getAdminProducts().then((res) => res && setProducts(res))
  }, [])

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAdd = () => {
    if (!form.name || !form.category || !form.price) {
      show('Please fill all required fields', 'error')
      return
    }
    show(`Product "${form.name}" added successfully (frontend demo)`, 'success')
    setShowAdd(false)
    setForm({ name: '', category: '', brand: '', price: '', stock: '' })
  }

  const handleDelete = (p) => {
    show(`Product "${p.name}" deleted (frontend demo)`, 'success')
  }

  const tabs = [
    { key: 'products', label: 'Products' },
    { key: 'categories', label: 'Categories' },
    { key: 'brands', label: 'Brands' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Product Management</h2>
          <p className="text-sm text-slate-500">{products.length} products across {CATEGORIES.length} categories</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search products..." className="w-64" />
          <Button icon={Plus} onClick={() => setShowAdd(true)}>Add Product</Button>
        </div>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === t.key
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <ChartCard title="Products" subtitle="Manage your product catalog">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">ID</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Name</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Category</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Brand</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Price</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Stock</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Rating</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Status</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">{p.id}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">{p.name}</td>
                    <td className="px-5 py-4 text-slate-600">{p.category}</td>
                    <td className="px-5 py-4 text-slate-600">{p.brand}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">₹{p.price.toLocaleString()}</td>
                    <td className="px-5 py-4 text-slate-700">{p.stock}</td>
                    <td className="px-5 py-4 text-slate-700">⭐ {p.rating}</td>
                    <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Button variant="ghost" size="sm" icon={Eye} onClick={() => setViewProduct(p)}>View</Button>
                        <Button variant="ghost" size="sm" icon={Edit3} onClick={() => show('Edit mode (frontend demo)', 'info')}>Edit</Button>
                        <button onClick={() => handleDelete(p)} className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}

      {activeTab === 'categories' && (
        <ChartCard title="Categories" subtitle="Manage product categories">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Products</th>
                  <th className="px-5 py-3.5 font-semibold">Revenue</th>
                  <th className="px-5 py-3.5 font-semibold">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CATEGORIES.map((c) => (
                  <tr key={c.name} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">{c.name}</td>
                    <td className="px-5 py-4 text-slate-700">{c.productCount.toLocaleString()}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">₹{(c.revenue / 100000).toFixed(1)}L</td>
                    <td className="px-5 py-4 text-emerald-600 font-semibold">{c.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}

      {activeTab === 'brands' && (
        <ChartCard title="Brands" subtitle="Top brands by market share">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3.5 font-semibold">Brand</th>
                  <th className="px-5 py-3.5 font-semibold">Products</th>
                  <th className="px-5 py-3.5 font-semibold">Market Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BRANDS.map((b) => (
                  <tr key={b.name} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">{b.name}</td>
                    <td className="px-5 py-4 text-slate-700">{b.products}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: `${b.marketShare * 2}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{b.marketShare}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add New Product"
        subtitle="Fill in the product details"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Product</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Product Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" placeholder="Enter product name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Category *</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" placeholder="e.g. Electronics" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Brand</label>
              <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" placeholder="e.g. Apple" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Price *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" placeholder="₹0" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Stock</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" placeholder="0" />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!viewProduct}
        onClose={() => setViewProduct(null)}
        title={viewProduct?.name || 'Product Details'}
        subtitle={viewProduct?.brand}
      >
        {viewProduct && (
          <div className="space-y-3">
            {Object.entries(viewProduct).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <span className="text-sm capitalize text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-sm font-semibold text-slate-900">{typeof val === 'number' && key === 'price' ? `₹${val.toLocaleString()}` : val}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}
