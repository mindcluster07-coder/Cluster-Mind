import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/marketing/Button'
import SearchBar from '../../components/marketing/SearchBar'
import CampaignTable from '../../components/marketing/CampaignTable'
import Modal from '../../components/marketing/Modal'
import { useToast } from '../../components/marketing/Toast'
import { CAMPAIGNS } from '../../data/marketingMockData'

const STATUSES = ['All', 'Draft', 'Scheduled', 'Active', 'Completed', 'Paused']
const SEGMENTS = [
  'All Segments',
  'Premium Customers',
  'Loyal Customers',
  'New Customers',
  'Price Sensitive',
  'Inactive Customers',
]
const CHANNELS = ['Email', 'WhatsApp', 'Push Notification']

const EMPTY_FORM = {
  name: '',
  description: '',
  segment: SEGMENTS[1],
  channel: 'Email',
  startDate: '',
  endDate: '',
  offer: '',
  message: '',
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100'

export default function CampaignsPage() {
  const { show } = useToast()
  const [campaigns, setCampaigns] = useState(CAMPAIGNS)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [segment, setSegment] = useState('All Segments')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
      const matchStatus = status === 'All' || c.status === status
      const matchSegment = segment === 'All Segments' || c.segment === segment
      return matchSearch && matchStatus && matchSegment
    })
  }, [campaigns, search, status, segment])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCampaign = {
      id: Date.now(),
      name: form.name,
      segment: form.segment,
      channel: form.channel,
      startDate: form.startDate,
      endDate: form.endDate,
      status: 'Draft',
      performance: 0,
    }
    setCampaigns((c) => [newCampaign, ...c])
    setModalOpen(false)
    setForm(EMPTY_FORM)
    show(`Campaign "${newCampaign.name}" created as Draft (frontend demo).`, 'success')
  }

  const handleDelete = (c) => {
    setCampaigns((list) => list.filter((x) => x.id !== c.id))
    show(`Campaign "${c.name}" deleted (frontend demo).`, 'info')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Campaign Management</h2>
          <p className="text-sm text-slate-500">{filtered.length} campaigns match your filters</p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          Create Campaign
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search campaigns..." className="w-full sm:w-64" />
        <div className="flex flex-wrap items-center gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                status === s ? 'bg-violet-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-400"
        >
          {SEGMENTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CampaignTable campaigns={filtered} onDelete={handleDelete} />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Campaign"
        subtitle="Set up a new marketing campaign"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="campaign-form">
              Create Campaign
            </Button>
          </>
        }
      >
        <form id="campaign-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Campaign Name</label>
              <input
                className={inputClass}
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Monsoon Sale 2024"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description of the campaign"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Target Segment</label>
              <select className={inputClass} value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })}>
                {SEGMENTS.filter((s) => s !== 'All Segments').map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Channel</label>
              <select className={inputClass} value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>
                {CHANNELS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Start Date</label>
              <input type="date" className={inputClass} required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">End Date</label>
              <input type="date" className={inputClass} required value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Offer</label>
              <input className={inputClass} value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} placeholder="e.g. 20% OFF" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Message customers will receive"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
