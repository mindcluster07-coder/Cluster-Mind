import { Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import marketingRoutes from './routes/marketingRoutes'
import adminRoutes from './routes/adminRoutes'
import { ToastProvider } from './components/marketing/Toast'

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {adminRoutes()}
          {marketingRoutes()}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </ToastProvider>
    </CartProvider>
  )
}
