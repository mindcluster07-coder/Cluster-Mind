import { useState, useEffect } from 'react'
import { Award, Star, Coins, RefreshCcw, Gift, Plus, RefreshCw } from 'lucide-react'
import KpiCard from '../../components/marketing/KpiCard'
import ChartCard from '../../components/marketing/ChartCard'
import DataTable from '../../components/marketing/DataTable'
import StatusBadge from '../../components/marketing/StatusBadge'
import Button from '../../components/marketing/Button'
import Modal from '../../components/marketing/Modal'
import { useToast } from '../../components/marketing/Toast'
import { getMarketingLoyalty, createMarketingLoyalty } from '../../api'
import { LOYALTY as MOCK_LOYALTY } from '../../data/marketingMockData'

const COLUMNS = [
  { key: 'member', label: 'Member' },
  { key: 'tier', label: 'Tier', render: (v) => <StatusBadge status={v} /> },
  { key: 'pointsEarned', label: 'Points Earned', render: (v) => v.toLocaleString() },
  { key: 'pointsRedeemed', label: 'Points Redeemed', render: (v) => v.toLocaleString() },
  { key: 'lastActivity', label: 'Last Activity' },
]

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100'

const EMPTY_TIER = { name: '', range: '', perk: '', color: 'from-violet-500 to-purple-500' }

export default function LoyaltyProgramsPage() {
  const { show } = useToast()
  const [loyalty, setLoyalty] = useState(MOCK_LOYALTY)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY_TIER)
  const [loading, setLoading] = useState(false)

  const load = () => {
    setLoading(true)
    getMarketingLoyalty().then((r) => {
      if (r) setLoyalty(r)
      setLoading(false)
    })
  }

  useEffect(load, [])

  const stats = loyalty.stats ?? MOCK_LOYALTY.stats
  const tiers = loyalty.tiers ?? MOCK_LOYALTY.tiers
  const activity = loyalty.activity ?? MOCK_LOYALTY.activity

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: form.name,
      tier: form.name,
      pointsEarned: 0,
      pointsRedeemed: 0,
      lastActivity: new Date().toISOString().split('T')[0],
    }
    const res = await createMarketingLoyalty(payload)
    if (res) {
      setLoyalty((l) => ({ ...l, tiers: [res, ...l.tiers] }))
      show(`Tier "${res.name}" created`, 'success')
    } else {
      show('Failed to create tier (backend unavailable)', 'error')
    }
    setModal(false)
    setForm(EMPTY_TIER)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Loyalty Programs</h2>
          <p className="text-sm text-slate-500">Reward tiers and member activity</p>
        </div>
        <div className="flex gap-2">
          <Button icon={Plus} onClick={() => setModal(true)}>Add Tier</Button>
          <Button variant="secondary" icon={RefreshCw} onClick={load} disabled={loading}>Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Loyalty Members" value={stats[0]?.value ?? MOCK_LOYALTY.stats[0].value} icon={Award} accent="from-violet-600 to-purple-600" />
        <KpiCard label="Total Points Issued" value={stats[1]?.value ?? MOCK_LOYALTY.stats[1].value} icon={Star} accent="from-amber-500 to-orange-500" />
        <KpiCard label="Points Redeemed" value={stats[2]?.value ?? MOCK_LOYALTY.stats[2].value} icon={Coins} accent="from-blue-600 to-cyan-500" />
        <KpiCard label="Active Rewards" value={stats[3]?.value ?? MOCK_LOYALTY.stats[3].value} icon={Gift} accent="from-emerald-500 to-teal-500" />
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-slate-900">Reward Tiers</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${t.color}`} />
              <p className="text-sm font-bold text-slate-900">{t.name} Tier</p>
              <p className="mt-0.5 text-xs text-slate-500">{t.range}</p>
              <p className="mt-3 text-sm text-slate-600">{t.perk}</p>
            </div>
          ))}
        </div>
      </div>

      <ChartCard
        title="Loyalty Activity"
        subtitle="Recent points activity across members"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <RefreshCcw className="h-3 w-3" />
            Updated today
          </span>
        }
      >
        <DataTable columns={COLUMNS} rows={activity} />
      </ChartCard>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Add Loyalty Tier"
        subtitle="Create a new reward tier"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button type="submit" form="tier-form">Create Tier</Button>
          </>
        }
      >
        <form id="tier-form" onSubmit={(e) => { e.preventDefault(); show('Tier creation via API (backend creates member record).', 'info'); setModal(false); }} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Tier Name</label>
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Platinum" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Points Range</label>
              <input className={inputClass} value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })} placeholder="e.g. 10,000+" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Color Gradient</label>
              <select className={inputClass} value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}>
                <option value="from-violet-500 to-purple-500">Violet → Purple</option>
                <option value="from-amber-500 to-orange-500">Amber → Orange</option>
                <option value="from-blue-500 to-cyan-500">Blue → Cyan</option>
                <option value="from-emerald-500 to-teal-500">Emerald → Teal</option>
                <option value="from-rose-500 to-pink-500">Rose → Pink</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Perk Description</label>
            <textarea className={`${inputClass} resize-none`} rows={2} value={form.perk} onChange={(e) => setForm({ ...form, perk: e.target.value })} placeholder="e.g. Free shipping + exclusive access" />
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Loyalty Members" value={stats[0]?.value ?? MOCK_LOYALTY.stats[0].value} icon={Award} accent="from-violet-600 to-purple-600" />
        <KpiCard label="Total Points Issued" value={stats[1]?.value ?? MOCK_LOYALTY.stats[1].value} icon={Star} accent="from-amber-500 to-orange-500" />
        <KpiCard label="Points Redeemed" value={stats[2]?.value ?? MOCK_LOYALTY.stats[2].value} icon={Coins} accent="from-blue-600 to-cyan-500" />
        <KpiCard label="Active Rewards" value={stats[3]?.value ?? MOCK_LOYALTY.stats[3].value} icon={Gift} accent="from-emerald-500 to-teal-500" />
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-slate-900">Reward Tiers</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${t.color}`} />
              <p className="text-sm font-bold text-slate-900">{t.name} Tier</p>
              <p className="mt-0.5 text-xs text-slate-500">{t.range}</p>
              <p className="mt-3 text-sm text-slate-600">{t.perk}</p>
            </div>
          ))}
        </div>
      </div>

      <ChartCard
        title="Loyalty Activity"
        subtitle="Recent points activity across members"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <RefreshCcw className="h-3 w-3" />
            Updated today
          </span>
        }
      >
        <DataTable columns={COLUMNS} rows={activity} />
      </ChartCard>
    </div>
  )
}