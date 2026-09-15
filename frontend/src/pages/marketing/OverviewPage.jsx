import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  LabelList,
  Legend,
} from 'recharts'
import { Users, Layers, Cpu, Megaphone, Banknote, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react'
import KpiCard from '../../components/marketing/KpiCard'
import ChartCard from '../../components/marketing/ChartCard'
import CampaignTable from '../../components/marketing/CampaignTable'
import Button from '../../components/marketing/Button'
import StatusBadge from '../../components/marketing/StatusBadge'
import { useToast } from '../../components/marketing/Toast'
import {
  getMarketingOverview,
  getMarketingSegments,
  getMarketingCampaigns,
} from '../../api'
import {
  KPI as MOCK_KPI,
  SEGMENT_DISTRIBUTION as MOCK_SEGMENT_DISTRIBUTION,
  SEGMENT_CLUSTERS as MOCK_SEGMENT_CLUSTERS,
  CAMPAIGN_PERFORMANCE as MOCK_CAMPAIGN_PERFORMANCE,
  AI_INSIGHTS as MOCK_AI_INSIGHTS,
  RECENT_CAMPAIGNS as MOCK_RECENT_CAMPAIGNS,
  MODEL_INFO as MOCK_MODEL_INFO,
  AI_ASSISTANT_MESSAGE as MOCK_AI_ASSISTANT_MESSAGE,
} from '../../data/marketingMockData'

const MOCK_SEGMENT_COLORS = MOCK_SEGMENT_DISTRIBUTION.map((s) => s.color)

function SegmentDonut({ data }) {
  const colors = data.map((s) => s.color)
  return (
    <div className="relative h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((s, i) => (
              <Cell key={s.name} fill={colors[i]} />
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
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-2xl font-black text-slate-900">{data[0]?.totalCustomers?.toLocaleString() || 0}</p>
        <p className="text-xs font-medium text-slate-400">Total</p>
      </div>
    </div>
  )
}

function ClusterScatter({ data }) {
  if (!data || !data.length) return <div className="h-64 flex items-center justify-center text-slate-400">No cluster data</div>
  const legend = [...new Set(data.map((c) => c.name))]
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis type="number" dataKey="x" name="Spending" domain={[0, 13]} tick={false} />
          <YAxis type="number" dataKey="y" name="Frequency" domain={[0, 12]} tick={false} width={1} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
          />
          {legend.map((name) => {
            const color = data.find((c) => c.name === name).color
            return (
              <Scatter
                key={name}
                name={name}
                data={data.filter((c) => c.name === name)}
                fill={color}
              />
            )
          })}
          <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-600">{v}</span>} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

function CampaignBar({ data }) {
  if (!data || !data.length) return <div className="h-64 flex items-center justify-center text-slate-400">No campaign data</div>
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis hide domain={[0, 100]} />
        <Tooltip
          formatter={(v) => [`${v}%`, 'Performance']}
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={i === 2 ? '#7c3aed' : '#6366f1'} />
          ))}
          <LabelList dataKey="value" position="top" formatter={(v) => `${v}%`} className="fill-slate-700" fontSize={12} fontWeight={700} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function OverviewPage() {
  const { show } = useToast()
  const [overview, setOverview] = useState(null)
  const [segments, setSegments] = useState(null)
  const [campaigns, setCampaigns] = useState(null)

  useEffect(() => {
    getMarketingOverview().then((r) => r && setOverview(r))
    getMarketingSegments().then((r) => r && setSegments(r))
    getMarketingCampaigns({ limit: 5 }).then((r) => r && setCampaigns(r.items))
  }, [])

  const kpi = overview?.stats ?? MOCK_KPI
  const segmentDist = segments ?? MOCK_SEGMENT_DISTRIBUTION
  const segmentClusters = segments?.clusters ?? MOCK_SEGMENT_CLUSTERS
  const campaignPerf = campaigns?.map(c => ({ name: c.name, value: c.performance })) ?? MOCK_CAMPAIGN_PERFORMANCE
  const recentCampaigns = campaigns ?? MOCK_RECENT_CAMPAIGNS
  const aiInsights = overview?.aiInsights ?? MOCK_AI_INSIGHTS
  const modelInfo = overview?.modelInfo ?? MOCK_MODEL_INFO
  const aiMessage = overview?.aiMessage ?? MOCK_AI_ASSISTANT_MESSAGE

  const handleRetrain = () => {
    show('Model training has been queued (frontend demo only).', 'success')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Total Customers Analyzed" value={kpi.totalCustomers?.toLocaleString() || MOCK_KPI.totalCustomers.toLocaleString()} icon={Users} accent="from-violet-600 to-purple-600" change="+4.2% vs last month" />
        <KpiCard label="Active Segments" value={kpi.activeSegments ?? MOCK_KPI.activeSegments} icon={Layers} accent="from-blue-600 to-cyan-500" change="+1 new segment" />
        <KpiCard label="AI Model Evaluation" value={`${kpi.modelEvaluation ?? MOCK_KPI.modelEvaluation}%`} icon={Cpu} accent="from-emerald-500 to-teal-500" change="Silhouette score (mock)" />
        <KpiCard label="Active Campaigns" value={kpi.activeCampaigns ?? MOCK_KPI.activeCampaigns} icon={Megaphone} accent="from-pink-500 to-rose-500" change="6 live right now" />
        <KpiCard label="Revenue from Campaigns" value={`₹${kpi.revenueFromCampaigns?.toLocaleString() || '18,75,230'}`} icon={Banknote} accent="from-amber-500 to-orange-500" change="+18.7% this period" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard title="Customer Segments" subtitle="Distribution across the active segments">
          <SegmentDonut data={segmentDist} />
        </ChartCard>

        <ChartCard
          title="Customer Segmentation"
          subtitle="Cluster visualization"
          className="xl:col-span-2"
        >
          <ClusterScatter data={segmentClusters} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard title="Campaign Performance" subtitle="Completion rate by campaign" className="xl:col-span-2">
          <CampaignBar data={campaignPerf} />
        </ChartCard>

        <div className="space-y-6">
          <ChartCard title="AI Recommendation Insights">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                    Total Recommendations
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{aiInsights.totalRecommendations?.toLocaleString() || MOCK_AI_INSIGHTS.totalRecommendations.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Accepted
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{aiInsights.acceptedRecommendations?.toLocaleString() || MOCK_AI_INSIGHTS.acceptedRecommendations.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Conversion Rate</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{aiInsights.conversionRate ?? MOCK_AI_INSIGHTS.conversionRate}%</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Average Order Value</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">₹{aiInsights.averageOrderValue?.toLocaleString() || MOCK_AI_INSIGHTS.averageOrderValue.toLocaleString()}</p>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 p-4 text-sm text-white">
                <p className="flex items-center gap-2 font-semibold">
                  <Sparkles className="h-4 w-4" />
                  AI Assistant
                </p>
                <p className="mt-1 text-xs leading-relaxed text-violet-100">{aiMessage || MOCK_AI_ASSISTANT_MESSAGE}</p>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Model Performance">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Cpu className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{modelInfo?.kmeans?.name || MOCK_MODEL_INFO.kmeans.name}</p>
                <p className="text-xs text-slate-500">
                  Last Trained: {modelInfo?.kmeans?.lastTrained || MOCK_MODEL_INFO.kmeans.lastTrained}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600">{modelInfo?.kmeans?.evaluation || MOCK_MODEL_INFO.kmeans.evaluation}%</span>
                  <StatusBadge status="Active" />
                </div>
              </div>
            </div>
            <Button className="mt-4 w-full" icon={RefreshCw} onClick={handleRetrain}>
              Retrain Model
            </Button>
          </ChartCard>
        </div>
      </div>

      <ChartCard title="Recent Campaigns" subtitle="Latest activity across all active campaigns">
        <CampaignTable campaigns={recentCampaigns.slice(0, 5)} />
      </ChartCard>
    </div>
  )
}