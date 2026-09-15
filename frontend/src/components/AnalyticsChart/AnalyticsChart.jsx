import "./AnalyticsChart.css";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const spending = [
  { month: "Jan", spending: 12000, orders: 2 },
  { month: "Feb", spending: 18000, orders: 3 },
  { month: "Mar", spending: 15000, orders: 2 },
  { month: "Apr", spending: 25000, orders: 4 },
  { month: "May", spending: 30000, orders: 5 },
  { month: "Jun", spending: 42000, orders: 6 },
];

const engagement = [
  { week: "W1", wishlist: 4, aiClicks: 8 },
  { week: "W2", wishlist: 6, aiClicks: 14 },
  { week: "W3", wishlist: 5, aiClicks: 20 },
  { week: "W4", wishlist: 9, aiClicks: 26 },
];

export default function AnalyticsChart() {
  return (
    <div className="analytics-card">

      <h2>Shopping Analytics</h2>
      <p>Your activity over the last 6 months</p>

      <div className="chart-block">
        <h3>Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={spending}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="spending"
              name="Spending (₹)"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#spendGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-block">
        <h3>Orders</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={spending}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-block">
        <h3>Wishlist & AI Engagement</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={engagement}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="wishlist" name="Wishlist Activity" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            <Bar dataKey="aiClicks" name="AI Recommendation" fill="#7C3AED" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
