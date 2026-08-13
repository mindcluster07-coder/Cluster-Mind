import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import { ToastProvider } from "./components/marketing/Toast";
import marketingRoutes from "./routes/marketingRoutes";

import Home from "./pages/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile/Profile";
import Feedback from "./pages/Feedback/Feedback";
import Help from "./pages/Help/Help";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProductImages from "./pages/ProductImages/ProductImages";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";

function App() {
  const loggedIn = isAuthenticated();

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={loggedIn ? <Navigate to="/" replace /> : <Register />}
          />
          <Route
            path="/forgot-password"
            element={loggedIn ? <Navigate to="/" replace /> : <ForgotPassword />}
          />
          <Route
            path="/"
            element={loggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/products"
            element={loggedIn ? <Products /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/products/:id"
            element={loggedIn ? <ProductDetails /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/cart"
            element={loggedIn ? <Cart /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/wishlist"
            element={loggedIn ? <Wishlist /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/checkout"
            element={loggedIn ? <Checkout /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/order-success/:orderId"
            element={loggedIn ? <OrderSuccess /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/orders"
            element={loggedIn ? <Orders /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={loggedIn ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/feedback"
            element={loggedIn ? <Feedback /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/help"
            element={loggedIn ? <Help /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/product-images"
            element={loggedIn ? <ProductImages /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/category/:category"
            element={loggedIn ? <CategoryProducts /> : <Navigate to="/login" replace />}
          />
          {marketingRoutes()}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
