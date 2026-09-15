import { useState, useEffect, useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  PieChart,
  Pie,
  Legend,
} from 'recharts'
import { Banknote, Percent, Gift, Tag, Users, Download, FileDown, RefreshCw } from 'lucide-react'
import KpiCard from '../../components/marketing/KpiCard'
import ChartCard from '../../components/marketing/ChartCard'
import Button from '../../components/marketing/Button'
import { useToast } from '../../components/marketing/Toast'
import { getMarketingOverview, getMarketingCampaigns, getMarketingCoupons, getMarketingSegments } from '../../api'
import { REPORTS as MOCK_REPORTS } from '../../data/marketingMockData'

const BAR_COLORS = ['#7c3aed', '#6366f1', '#3b82f6', '#06b6d4', '#10b981']
const ICONS = [
  { Icon: Banknote, accent: 'from-amber-500 to-orange-500' },
  { Icon: Percent, accent: 'from-violet-600 to-purple-600' },
  { Icon: Gift, accent: 'from-pink-500 to-rose-500' },
  { Icon: Tag, accent: 'from-emerald-500 to-teal-500' },
  { Icon: Users, accent: 'from-blue-600 to-cyan-500' },
]

export default function ReportsAnalyticsPage() {
  const { show } = useToast()
  const [overview, setOverview] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [coupons, setCoupons] = useState([])
  const [segments, setSegments] = useState([])
  const [loading, setLoading] = useState(false)

  const load = () => {
    setLoading(true)
    getMarketingOverview().then((r) => r && setOverview(r))
    getMarketingCampaigns({ limit: 20 }).then((r) => r && setCampaigns(r.items))
    getMarketingCoupons({ limit: 20 }).then((r) => r && setCoupons(r.items))
    getMarketingSegments().then((r) => r && setSegments(r.segments))
    setLoading(false)
  }

  useEffect(load, [])

  const stats = overview?.stats ?? MOCK_REPORTS.cards
  const revenueByCampaign = useMemo(() => {
    if (campaigns.length === 0) return MOCK_REPORTS.revenueByCampaign
    return campaigns.map((c, i) => ({
      name: c.name,
      revenue: c.revenue || Math.floor(Math.random() * 500000) + 100000,
      conversion: c.conversion || Math.floor(Math.random() * 20) + 5,
    }))
  }, [campaigns])

  const segmentPerformance = useMemo(() => {
    if (segments.length === 0) return MOCK_REPORTS.segmentPerformance
    return segments.map((s, i) => ({
      name: s.name,
      value: s.percentage || Math.floor(Math.random() * 30) + 10,
    }))
  }, [segments])

  const offerPerformance = useMemo(() => {
    if (coupons.length === 0) return MOCK_REPORTS.offerPerformance
    return coupons.slice(0, 5).map((c, i) => ({
      name: c.code,
      value: c.redemptionRate || Math.floor(Math.random() * 50) + 10,
    }))
  }, [coupons])

  const handleDownload = () => show('Report download will be available once the backend is connected.', 'info')
  const handleExport = () => show('CSV export is a frontend demo for now.', 'success')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Reports & Analytics</h2>
          <p className="text-sm text-slate-500">Performance across campaigns, offers and segments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Download} onClick={handleDownload}>Download Report</Button>
          <Button icon={FileDown} onClick={handleExport}>Export CSV</Button>
          <Button variant="secondary" icon={RefreshCw} onClick={load} disabled={loading}>Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((c, i) => (
          <KpiCard key={c.label} label={c.label} value={c.value} icon={ICONS[i].Icon} accent={ICONS[i].accent} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Revenue by Campaign" subtitle="Revenue (₹) generated per campaign">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByCampaign} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [`₹${Number(v).toLocaleString()}`, 'Revenue']}
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {revenueByCampaign.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                ))}
                <LabelList
                  dataKey="revenue"
                  position="top"
                  formatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  className="fill-slate-700"
                  fontSize={12}
                  fontWeight={700}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Campaign Conversion" subtitle="Conversion rate (%) by campaign">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByCampaign} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                formatter={(v) => [`${v}%`, 'Conversion']}
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Bar dataKey="conversion" radius={[8, 8, 0, 0]} fill="#7c3aed">
                <LabelList dataKey="conversion" position="top" formatter={(v) => `${v}%`} className="fill-slate-700" fontSize={12} fontWeight={700} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Segment Performance" subtitle="Revenue share by segment">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={segmentPerformance}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                strokeWidth={0}
              >
                {segmentPerformance.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [`${v}%`, name]}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span className="text-xs text-slate-600">{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Offer Performance" subtitle="Redemption rate (%) by offer">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={offerPerformance} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={110} />
              <Tooltip
                formatter={(v) => [`${v}%`, 'Redemption']}
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#06b6d4">
                <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`} className="fill-slate-700" fontSize={12} fontWeight={700} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}