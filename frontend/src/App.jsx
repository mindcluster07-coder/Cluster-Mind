import { Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPlaceholder from './pages/DashboardPlaceholder'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<DashboardPlaceholder title="Admin Dashboard" role="admin" />} />
        <Route path="/marketing" element={<DashboardPlaceholder title="Marketing Dashboard" role="marketing" />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </CartProvider>
  )
}
