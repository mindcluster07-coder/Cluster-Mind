import { useState, useEffect } from 'react'
import { Plus, RefreshCw, Trash2 } from 'lucide-react'
import Button from '../../components/marketing/Button'
import ChartCard from '../../components/marketing/ChartCard'
import DataTable from '../../components/marketing/DataTable'
import StatusBadge from '../../components/marketing/StatusBadge'
import Modal from '../../components/marketing/Modal'
import { useToast } from '../../components/marketing/Toast'
import { getMarketingCoupons, createMarketingCoupon, deleteMarketingCoupon } from '../../api'
import { OFFERS as MOCK_OFFERS, COUPONS as MOCK_COUPONS } from '../../data/marketingMockData'

const COLUMNS = [
  { key: 'name', label: 'Name', render: (v) => <span className="font-semibold text-slate-900">{v}</span> },
  { key: 'type', label: 'Type', render: (v) => <StatusBadge status={v} /> },
  { key: 'discount', label: 'Discount' },
  { key: 'segment', label: 'Target Segment' },
  { key: 'validFrom', label: 'Valid From' },
  { key: 'validUntil', label: 'Valid Until' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
]

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100'

const EMPTY = { name: '', discount: '', segment: 'All Customers', validFrom: '', validUntil: '' }

export default function OffersCouponsPage() {
  const { show } = useToast()
  const [offers, setOffers] = useState(MOCK_OFFERS)
  const [coupons, setCoupons] = useState(MOCK_COUPONS)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)

  const load = () => {
    setLoading(true)
    getMarketingCoupons().then((r) => {
      if (r) setCoupons(r.items)
      setLoading(false)
    })
  }

  useEffect(load, [])

  const openCreate = () => {
    setForm(EMPTY)
    setModal('coupon')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      code: form.name,
      discount: parseFloat(form.discount) || 0,
      segment: form.segment,
      validFrom: form.validFrom,
      validUntil: form.validUntil,
      status: 'Active',
    }
    const res = await createMarketingCoupon(payload)
    if (res) {
      setCoupons((c) => [res, ...c])
      show(`Coupon "${res.code}" created`, 'success')
    } else {
      show('Failed to create coupon (backend unavailable)', 'error')
    }
    setModal(null)
  }

  const handleDelete = async (c) => {
    const res = await deleteMarketingCoupon(c.id)
    if (res) {
      setCoupons((list) => list.filter((x) => x.id !== c.id))
      show(`Coupon "${c.code}" deleted`, 'info')
    } else {
      show('Failed to delete coupon', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Offers & Coupons</h2>
          <p className="text-sm text-slate-500">Discounts and promotion codes by segment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Plus} onClick={openCreate}>Create Coupon</Button>
          <Button variant="secondary" icon={RefreshCw} onClick={load} disabled={loading}>Refresh</Button>
        </div>
      </div>

      <ChartCard title="Offers" subtitle={`${offers.length} active offers`}>
        <DataTable columns={COLUMNS} rows={offers} />
      </ChartCard>

      <ChartCard title="Coupons" subtitle={`${coupons.length} active coupons`}>
        <DataTable columns={COLUMNS} rows={coupons} onDelete={handleDelete} />
      </ChartCard>

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title="Create Coupon"
        subtitle="New promotion code for the selected segment"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button type="submit" form="coupon-form">Create Coupon</Button>
          </>
        }
      >
        <form id="coupon-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Coupon Code</label>
            <input
              className={inputClass}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. SAVE500"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Discount (%)</label>
              <input className={inputClass} required value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="e.g. 20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Target Segment</label>
              <select className={inputClass} value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })}>
                {['All Customers', 'Premium Customers', 'Loyal Customers', 'New Customers', 'Price Sensitive'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Valid From</label>
              <input type="date" className={inputClass} required value={form.validFrom} onChange={(e) => setForm({ ...form, validFrom: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Valid Until</label>
              <input type="date" className={inputClass} required value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}