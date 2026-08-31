import { useEffect, useState } from 'react'
import { MessageSquare, ThumbsUp, AlertTriangle, Lightbulb, Headphones, Star, CheckCircle2 } from 'lucide-react'
import ChartCard from '../../components/marketing/ChartCard'
import Button from '../../components/marketing/Button'
import StatusBadge from '../../components/marketing/StatusBadge'
import SearchBar from '../../components/marketing/SearchBar'
import { useToast } from '../../components/marketing/Toast'
import { getAdminFeedback, updateAdminFeedbackStatus } from '../../api'
import { FEEDBACK_DATA as MOCK_FEEDBACK_DATA } from '../../data/adminMockData'

export default function AdminFeedbackPage() {
  const { show } = useToast()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [feedbacks, setFeedbacks] = useState(MOCK_FEEDBACK_DATA)

  const load = () => {
    getAdminFeedback().then((res) => {
      if (res) setFeedbacks(res.map((f) => ({ ...f, id: f._id ?? f.id })))
    })
  }

  useEffect(load, [])

  const types = ['All', 'Review', 'Complaint', 'Suggestion', 'Feedback', 'Ticket']

  const filtered = feedbacks.filter(
    (f) =>
      (typeFilter === 'All' || f.type === typeFilter) &&
      (f.customer.toLowerCase().includes(search.toLowerCase()) ||
        f.content.toLowerCase().includes(search.toLowerCase())),
  )

  const resolve = async (f) => {
    const res = await updateAdminFeedbackStatus(f.id, 'Resolved')
    if (res) {
      show(`Feedback marked as resolved`, 'success')
      load()
    } else {
      show('Unable to update feedback (backend unavailable)', 'error')
    }
  }

  const typeIcons = {
    Review: Star,
    Complaint: AlertTriangle,
    Suggestion: Lightbulb,
    Feedback: ThumbsUp,
    Ticket: Headphones,
  }

  const typeColors = {
    Review: 'bg-yellow-100 text-yellow-700',
    Complaint: 'bg-red-100 text-red-700',
    Suggestion: 'bg-blue-100 text-blue-700',
    Feedback: 'bg-green-100 text-green-700',
    Ticket: 'bg-purple-100 text-purple-700',
  }

  const stats = {
    total: feedbacks.length,
    reviews: feedbacks.filter((f) => f.type === 'Review').length,
    complaints: feedbacks.filter((f) => f.type === 'Complaint').length,
    open: feedbacks.filter((f) => f.status === 'Open' || f.status === 'In Progress').length,
    avgRating: feedbacks.length ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Feedback Management</h2>
          <p className="text-sm text-slate-500">Reviews, complaints, suggestions, and support tickets</p>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Search feedback..." className="w-64" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Feedback</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Reviews</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.reviews}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Complaints</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.complaints}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Open Issues</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.open}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Avg Rating</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">⭐ {stats.avgRating}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              typeFilter === t
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ChartCard title="Feedback & Support" subtitle={`Showing ${filtered.length} items`}>
        <div className="space-y-3">
          {filtered.map((f) => {
            const Icon = typeIcons[f.type] || MessageSquare
            return (
              <div key={f.id} className="rounded-xl border border-slate-200 p-4 transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${typeColors[f.type] || 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{f.customer}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeColors[f.type]}`}>{f.type}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{f.content}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                        <span>{f.product}</span>
                        <span>⭐ {f.rating}/5</span>
                        <span>{f.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={f.status} />
                    {f.status !== 'Resolved' && (
                      <Button variant="ghost" size="sm" icon={CheckCircle2} onClick={() => resolve(f)}>Resolve</Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ChartCard>
    </div>
  )
}
