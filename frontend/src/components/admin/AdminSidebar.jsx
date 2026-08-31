import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Brain,
  Activity,
  Layers,
  Sparkles,
  Cpu,
  Megaphone,
  BarChart3,
  Bell,
  MessageSquare,
  Shield,
  Settings,
  LogOut,
  X,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import Button from '../../components/marketing/Button'

const NAV_SECTIONS = [
  {
    label: 'Dashboard',
    items: [
      { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: 'Management',
    items: [
      { to: '/admin/customers', label: 'Customer Management', icon: Users },
      { to: '/admin/products', label: 'Product Management', icon: Package },
      { to: '/admin/orders', label: 'Order Management', icon: ShoppingCart },
    ],
  },
  {
    label: 'AI & Analytics',
    items: [
      { to: '/admin/behaviour', label: 'Behaviour Analysis', icon: Activity },
      { to: '/admin/segmentation', label: 'Customer Segmentation', icon: Layers },
      { to: '/admin/recommendations', label: 'AI Recommendations', icon: Sparkles },
    ],
  },
  {
    label: 'AI/ML',
    items: [
      { to: '/admin/models', label: 'Model Management', icon: Cpu },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { to: '/admin/marketing', label: 'Marketing Management', icon: Megaphone },
      { to: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Administration',
    items: [
      { to: '/admin/notifications', label: 'Notifications', icon: Bell },
      { to: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
      { to: '/admin/users', label: 'User & Role Management', icon: Shield },
      { to: '/admin/settings', label: 'System Settings', icon: Settings },
    ],
  },
]

export const ADMIN_NAV_ITEMS = NAV_SECTIONS.flatMap((s) => s.items)

export default function AdminSidebar({ open, onClose, onLogout }) {
  const user = JSON.parse(localStorage.getItem('shopsmart_user') || '{}')
  const name = user.name || 'Admin'
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const [collapsed, setCollapsed] = useState({})

  const toggle = (label) => setCollapsed((p) => ({ ...p, [label]: !p[label] }))

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
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight text-white">ShopSmart</p>
              <p className="text-[11px] font-medium text-slate-400">Admin Dashboard</p>
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

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-3">
              <button
                onClick={() => toggle(section.label)}
                className="flex w-full items-center justify-between px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 transition hover:text-slate-300"
              >
                {section.label}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${collapsed[section.label] ? '-rotate-90' : ''}`}
                />
              </button>
              {!collapsed[section.label] &&
                section.items.map(({ to, label, icon: Icon, end }) => (
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
                            layoutId="admin-sidebar-active"
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 shadow-lg shadow-red-600/30"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                        <Icon className="relative z-10 h-[18px] w-[18px] shrink-0" />
                        <span className="relative z-10">{label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-sm font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{name}</p>
              <p className="truncate text-xs text-slate-400">Super Admin</p>
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
