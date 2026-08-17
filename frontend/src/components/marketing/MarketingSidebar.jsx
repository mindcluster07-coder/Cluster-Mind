import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Database,
  Activity,
  Layers,
  Sparkles,
  Megaphone,
  Ticket,
  Award,
  Crosshair,
  BarChart3,
  Cpu,
  Settings,
  LogOut,
  X,
} from 'lucide-react'
import Button from './Button'

export const NAV_ITEMS = [
  { to: '/marketing', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/marketing/dataset', label: 'Dataset Management', icon: Database },
  { to: '/marketing/behaviour', label: 'Behaviour Analysis', icon: Activity },
  { to: '/marketing/segmentation', label: 'Customer Segmentation', icon: Layers },
  { to: '/marketing/recommendations', label: 'Recommendation Engine', icon: Sparkles },
  { to: '/marketing/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/marketing/offers', label: 'Offers & Coupons', icon: Ticket },
  { to: '/marketing/loyalty', label: 'Loyalty Programs', icon: Award },
  { to: '/marketing/targeting', label: 'Customer Targeting', icon: Crosshair },
  { to: '/marketing/reports', label: 'Reports & Analytics', icon: BarChart3 },
  { to: '/marketing/models', label: 'Model Performance', icon: Cpu },
  { to: '/marketing/settings', label: 'Settings', icon: Settings },
]

export default function MarketingSidebar({ open, onClose, onLogout }) {
  const user = JSON.parse(localStorage.getItem('shopsmart_user') || '{}')
  const name = user.name || 'Marketing Team'
  const role = 'Marketing Team'
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0d1226] transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight text-white">ShopSmart</p>
              <p className="text-[11px] font-medium text-slate-400">AI Personalized Marketing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 transition hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-6 mb-4 rounded-xl bg-white/5 px-4 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Dashboard</p>
          <p className="text-sm font-bold text-white">Marketing & AI</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive ? 'text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-600/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="relative z-10 h-[18px] w-[18px] shrink-0" />
                  <span className="relative z-10">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-sm font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{name}</p>
              <p className="truncate text-xs text-slate-400">{role}</p>
            </div>
          </div>
          <Button variant="danger" className="w-full" icon={LogOut} onClick={onLogout}>
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
