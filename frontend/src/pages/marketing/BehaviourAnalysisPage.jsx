import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
} from 'recharts'
import { ShoppingCart, Wallet, Repeat, Package, Heart, ShoppingBag, Search } from 'lucide-react'
import KpiCard from '../../components/marketing/KpiCard'
import ChartCard from '../../components/marketing/ChartCard'
import { BEHAVIOUR } from '../../data/marketingMockData'

const FREQ_COLORS = ['#7c3aed', '#6366f1', '#3b82f6', '#06b6d4', '#10b981']
const CATEGORY_COLORS = ['#7c3aed', '#2563eb', '#06b6d4', '#f59e0b', '#10b981']

const ICONS = [
  { Icon: ShoppingCart, accent: 'from-violet-600 to-purple-600' },
  { Icon: Wallet, accent: 'from-blue-600 to-cyan-500' },
  { Icon: Repeat, accent: 'from-emerald-500 to-teal-500' },
  { Icon: Package, accent: 'from-pink-500 to-rose-500' },
  { Icon: Heart, accent: 'from-amber-500 to-orange-500' },
  { Icon: ShoppingBag, accent: 'from-indigo-500 to-blue-500' },
  { Icon: Search, accent: 'from-slate-600 to-slate-800' },
]

export default function BehaviourAnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BEHAVIOUR.stats.map((s, i) => (
          <KpiCard key={s.label} label={s.label} value={s.value} change={s.change} icon={ICONS[i].Icon} accent={ICONS[i].accent} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Purchase Frequency" subtitle="Orders placed per customer per month">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={BEHAVIOUR.purchaseFrequency} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v, n) => [`${v}%`, n]}
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {BEHAVIOUR.purchaseFrequency.map((_, i) => (
                  <Cell key={i} fill={FREQ_COLORS[i % FREQ_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Spending Distribution" subtitle="Share of customers by annual spend band">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={BEHAVIOUR.spendingDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                strokeWidth={0}
              >
                {BEHAVIOUR.spendingDistribution.map((_, i) => (
                  <Cell key={i} fill={FREQ_COLORS[i % FREQ_COLORS.length]} />
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

        <ChartCard title="Favourite Categories" subtitle="Most purchased product categories">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={BEHAVIOUR.favouriteCategories}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                strokeWidth={0}
              >
                {BEHAVIOUR.favouriteCategories.map((_, i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
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

        <ChartCard title="Customer Activity" subtitle="Views, carts and purchases across May 2024">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={BEHAVIOUR.customerActivity} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCarts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPurchases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-600">{v}</span>} />
              <Area type="monotone" dataKey="views" stroke="#7c3aed" fill="url(#gradViews)" strokeWidth={2} />
              <Area type="monotone" dataKey="carts" stroke="#2563eb" fill="url(#gradCarts)" strokeWidth={2} />
              <Area type="monotone" dataKey="purchases" stroke="#10b981" fill="url(#gradPurchases)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
