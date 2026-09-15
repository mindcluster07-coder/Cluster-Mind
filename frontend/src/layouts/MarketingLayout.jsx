import { useState } from 'react'
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import MarketingSidebar from '../components/marketing/MarketingSidebar'
import MarketingHeader from '../components/marketing/MarketingHeader'
import { getCurrentUser, isAuthenticated, logout } from '../services/auth'

export default function MarketingLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated() || getCurrentUser()?.role !== 'marketing') {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <MarketingSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="lg:pl-72">
        <MarketingHeader onMenu={() => setSidebarOpen(true)} />
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-4 sm:p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
