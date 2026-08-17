import { motion } from 'framer-motion'

export default function KpiCard({ label, value, icon: Icon, accent = 'from-violet-600 to-blue-600', change, suffix }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-slate-900">
            {value}
            {suffix && <span className="text-base font-semibold text-slate-500">{suffix}</span>}
          </p>
        </div>
        {Icon && (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {change && <p className="mt-2 text-xs font-medium text-emerald-600">{change}</p>}
    </motion.div>
  )
}
