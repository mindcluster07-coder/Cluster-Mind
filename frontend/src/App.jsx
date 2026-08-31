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
          <Route path="/dashboard" element={<CustomerOnly><Home /></CustomerOnly>} />
          <Route path="/products" element={<CustomerOnly><Products /></CustomerOnly>} />
          <Route path="/products/:id" element={<CustomerOnly><ProductDetails /></CustomerOnly>} />
          <Route path="/cart" element={<CustomerOnly><Cart /></CustomerOnly>} />
          <Route path="/wishlist" element={<CustomerOnly><Wishlist /></CustomerOnly>} />
          <Route path="/checkout" element={<CustomerOnly><Checkout /></CustomerOnly>} />
          <Route path="/order-success/:orderId" element={<CustomerOnly><OrderSuccess /></CustomerOnly>} />
          <Route path="/orders" element={<CustomerOnly><Orders /></CustomerOnly>} />
          <Route path="/profile" element={<CustomerOnly><Profile /></CustomerOnly>} />
          <Route path="/feedback" element={<CustomerOnly><Feedback /></CustomerOnly>} />
          <Route path="/help" element={<CustomerOnly><Help /></CustomerOnly>} />
          <Route path="/product-images" element={<CustomerOnly><ProductImages /></CustomerOnly>} />
          <Route path="/category/:category" element={<CustomerOnly><CategoryProducts /></CustomerOnly>} />
          {marketingRoutes()}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </ToastProvider>
    </CartProvider>
  )
}
