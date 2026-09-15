import { Award, Star, Coins, RefreshCcw, Gift } from 'lucide-react'
import KpiCard from '../../components/marketing/KpiCard'
import ChartCard from '../../components/marketing/ChartCard'
import DataTable from '../../components/marketing/DataTable'
import StatusBadge from '../../components/marketing/StatusBadge'
import { LOYALTY } from '../../data/marketingMockData'

const COLUMNS = [
  { key: 'member', label: 'Member' },
  { key: 'tier', label: 'Tier', render: (v) => <StatusBadge status={v} /> },
  { key: 'pointsEarned', label: 'Points Earned', render: (v) => v.toLocaleString() },
  { key: 'pointsRedeemed', label: 'Points Redeemed', render: (v) => v.toLocaleString() },
  { key: 'lastActivity', label: 'Last Activity' },
]

export default function LoyaltyProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Loyalty Members" value={LOYALTY.stats[0].value} icon={Award} accent="from-violet-600 to-purple-600" />
        <KpiCard label="Total Points Issued" value={LOYALTY.stats[1].value} icon={Star} accent="from-amber-500 to-orange-500" />
        <KpiCard label="Points Redeemed" value={LOYALTY.stats[2].value} icon={Coins} accent="from-blue-600 to-cyan-500" />
        <KpiCard label="Active Rewards" value={LOYALTY.stats[3].value} icon={Gift} accent="from-emerald-500 to-teal-500" />
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-slate-900">Reward Tiers</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LOYALTY.tiers.map((t) => (
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
        <DataTable columns={COLUMNS} rows={LOYALTY.activity} />
      </ChartCard>
    </div>
  )
}
