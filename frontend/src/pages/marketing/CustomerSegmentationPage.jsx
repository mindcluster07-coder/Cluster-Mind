import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { Users, Layers, Cpu, Play, RefreshCw } from 'lucide-react'
import KpiCard from '../../components/marketing/KpiCard'
import ChartCard from '../../components/marketing/ChartCard'
import DataTable from '../../components/marketing/DataTable'
import Button from '../../components/marketing/Button'
import StatusBadge from '../../components/marketing/StatusBadge'
import { useToast } from '../../components/marketing/Toast'
import { getMarketingSegments, getMarketingOverview } from '../../api'
import { KPI as MOCK_KPI, SEGMENT_DISTRIBUTION as MOCK_SEGMENT_DISTRIBUTION, SEGMENT_CLUSTERS as MOCK_SEGMENT_CLUSTERS, SEGMENTS as MOCK_SEGMENTS } from '../../data/marketingMockData'

const COLUMNS = [
  { key: 'name', label: 'Segment' },
  { key: 'customers', label: 'Customers', render: (v) => v.toLocaleString() },
  { key: 'percentage', label: 'Percentage', render: (v) => `${v}%` },
  { key: 'avgSpending', label: 'Average Spending' },
  { key: 'frequency', label: 'Purchase Frequency' },
  { key: 'type', label: 'Customer Type', render: (v) => <StatusBadge status={v} /> },
]

export default function CustomerSegmentationPage() {
  const { show } = useToast()
  const [overview, setOverview] = useState(null)
  const [segments, setSegments] = useState(null)

  useEffect(() => {
    getMarketingOverview().then((r) => r && setOverview(r))
    getMarketingSegments().then((r) => r && setSegments(r))
  }, [])

  const kpi = overview?.stats ?? MOCK_KPI
  const segmentDist = segments?.segments ?? MOCK_SEGMENT_DISTRIBUTION
  const segmentClusters = segments?.clusters ?? MOCK_SEGMENT_CLUSTERS
  const segmentDetails = segments?.segments ?? MOCK_SEGMENTS
  const colors = segmentDist.map((s) => s.color)
  const legend = [...new Set(segmentClusters.map((c) => c.name))]

  const handleRun = () => {
    show('Segmentation connected to ML service (placeholder).', 'info')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Customer Segmentation</h2>
          <p className="text-sm text-slate-500">Clusters produced from behaviour analysis</p>
        </div>
        <div className="flex gap-2">
          <Button icon={Play} onClick={handleRun}>Run Segmentation</Button>
          <Button variant="secondary" icon={RefreshCw} onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Total Customers" value={kpi.totalCustomers?.toLocaleString() || MOCK_KPI.totalCustomers.toLocaleString()} icon={Users} accent="from-violet-600 to-purple-600" />
        <KpiCard label="Number of Segments" value={segmentDist.length} icon={Layers} accent="from-blue-600 to-cyan-500" />
        <KpiCard label="Model Evaluation" value={`${kpi.modelEvaluation ?? MOCK_KPI.modelEvaluation}%`} icon={Cpu} accent="from-emerald-500 to-teal-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Segment Distribution" subtitle="Percentage of customers per segment">
          <div className="relative h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentDist}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {segmentDist.map((s, i) => (
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
              <p className="text-2xl font-black text-slate-900">{kpi.totalCustomers?.toLocaleString() || MOCK_KPI.totalCustomers.toLocaleString()}</p>
              <p className="text-xs font-medium text-slate-400">Total</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Cluster Visualization" subtitle="Representation of segment clusters">
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" dataKey="x" domain={[0, 13]} tick={false} />
              <YAxis type="number" dataKey="y" domain={[0, 12]} tick={false} width={1} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              {legend.map((name) => {
                const color = segmentClusters.find((c) => c.name === name)?.color
                return (
                  <Scatter
                    key={name}
                    name={name}
                    data={segmentClusters.filter((c) => c.name === name)}
                    fill={color}
                  />
                )
              })}
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-600">{v}</span>} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Segment Details" subtitle="Characteristics of each customer segment">
        <DataTable columns={COLUMNS} rows={segmentDetails} />
      </ChartCard>
    </div>
  )
}