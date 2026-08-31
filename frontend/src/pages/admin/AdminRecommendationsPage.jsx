import { useEffect, useState } from 'react'
import { Sparkles, TrendingUp, Zap, ArrowUpRight, RefreshCw } from 'lucide-react'
import KpiCard from '../../components/marketing/KpiCard'
import ChartCard from '../../components/marketing/ChartCard'
import DataTable from '../../components/marketing/DataTable'
import Button from '../../components/marketing/Button'
import StatusBadge from '../../components/marketing/StatusBadge'
import { useToast } from '../../components/marketing/Toast'
import { getAdminRecommendations } from '../../api'
import { AI_RECOMMENDATIONS as MOCK_AI_RECOMMENDATIONS } from '../../data/adminMockData'

export default function AdminRecommendationsPage() {
  const { show } = useToast()
  const [activeTab, setActiveTab] = useState('product')
  const [data, setData] = useState(MOCK_AI_RECOMMENDATIONS)

  useEffect(() => {
    getAdminRecommendations().then((res) => res && setData(res))
  }, [])

  const tabs = [
    { key: 'product', label: 'Product Recommendations' },
    { key: 'offer', label: 'Offer Recommendations' },
    { key: 'crossSelling', label: 'Cross Selling' },
    { key: 'upSelling', label: 'Up Selling' },
    { key: 'fbt', label: 'Frequently Bought Together' },
    { key: 'history', label: 'History' },
  ]

  const productCols = [
    { key: 'segment', label: 'Segment' },
    { key: 'item', label: 'Recommended Item' },
    { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  ]

  const offerCols = [
    { key: 'segment', label: 'Segment' },
    { key: 'item', label: 'Offer' },
    { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  ]

  const crossCols = [
    { key: 'primary', label: 'Primary Product' },
    { key: 'cross', label: 'Cross-sell' },
    { key: 'affinity', label: 'Affinity' },
    { key: 'reason', label: 'Reason' },
  ]

  const upCols = [
    { key: 'product', label: 'Current Product' },
    { key: 'upsell', label: 'Upsell To' },
    { key: 'priceDiff', label: 'Price Diff' },
    { key: 'conversion', label: 'Conversion' },
  ]

  const historyCols = [
    { key: 'date', label: 'Date' },
    { key: 'recommendations', label: 'Generated', render: (v) => v.toLocaleString() },
    { key: 'accepted', label: 'Accepted', render: (v) => v.toLocaleString() },
    { key: 'rate', label: 'Rate' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Recommendation Engine</h2>
          <p className="text-sm text-slate-500">AI-powered personalized product and offer recommendations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={RefreshCw} onClick={() => show('History refreshed (demo)', 'info')}>Refresh</Button>
          <Button icon={Sparkles} onClick={() => show('Recommendations regenerated (demo)', 'success')}>Generate</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((s, i) => {
          const icons = [Sparkles, TrendingUp, Zap, ArrowUpRight]
          const accents = ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500', 'from-violet-500 to-purple-500']
          return <KpiCard key={i} label={s.label} value={s.value} icon={icons[i]} accent={accents[i]} />
        })}
      </div>

      <div className="flex flex-wrap gap-2">
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

      {activeTab === 'product' && (
        <ChartCard title="Product Recommendations" subtitle="Personalized product suggestions by segment">
          <DataTable columns={productCols} rows={data.product} />
        </ChartCard>
      )}

      {activeTab === 'offer' && (
        <ChartCard title="Offer Recommendations" subtitle="AI-suggested offers by segment">
          <DataTable columns={offerCols} rows={data.offer} />
        </ChartCard>
      )}

      {activeTab === 'crossSelling' && (
        <ChartCard title="Cross Selling" subtitle="Products frequently bought together">
          <DataTable columns={crossCols} rows={data.crossSelling} />
        </ChartCard>
      )}

      {activeTab === 'upSelling' && (
        <ChartCard title="Up Selling" subtitle="Upgrade suggestions with conversion rates">
          <DataTable columns={upCols} rows={data.upSelling} />
        </ChartCard>
      )}

      {activeTab === 'fbt' && (
        <ChartCard title="Frequently Bought Together" subtitle="Product bundles">
          <div className="space-y-3">
            {data.frequentlyBoughtTogether.map((b, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  {b.items.map((item, j) => (
                    <span key={j} className="flex items-center gap-2">
                      <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm">{item}</span>
                      {j < b.items.length - 1 && <span className="text-slate-400">+</span>}
                    </span>
                  ))}
                </div>
                <span className="ml-4 text-sm font-bold text-slate-900">{b.frequency}x</span>
              </div>
            ))}
          </div>
        </ChartCard>
      )}

      {activeTab === 'history' && (
        <ChartCard title="Recommendation History" subtitle="Daily recommendation performance">
          <DataTable columns={historyCols} rows={data.history} />
        </ChartCard>
      )}
    </div>
  )
}
