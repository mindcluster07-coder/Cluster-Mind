import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gift, ChevronRight } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import AddressCard from "../../components/AddressCard/AddressCard";
import ShippingMethod from "../../components/ShippingMethod/ShippingMethod";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import PlaceOrderButton from "../../components/PlaceOrderButton/PlaceOrderButton";
import CouponBox from "../../components/CouponBox/CouponBox";
import {
  subscribeCart,
  getCartItems,
  getAppliedCoupon,
  clearCoupon,
} from "../../services/cart";
import { clearCart } from "../../services/cart";
import { getProductById } from "../../services/products";
import {
  getSavedAddress,
  saveAddress,
  SHIPPING_METHODS,
  PAYMENT_METHODS,
  placeOrder,
} from "../../services/orders";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCartItems());
  const [, force] = useState(0);
  const [address, setAddress] = useState(getSavedAddress());
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("upi");
  const [gift, setGift] = useState(false);
  const [placing, setPlacing] = useState(false);

  useEffect(() => subscribeCart(() => {
    setCart(getCartItems());
    force((n) => n + 1);
  }), []);

  const items = useMemo(
    () =>
      cart
        .map((i) => ({ ...i, product: getProductById(i.productId) }))
        .filter((i) => i.product),
    [cart]
  );

  const coupon = getAppliedCoupon();
  const discount = coupon?.discount || 0;
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shippingMethod = SHIPPING_METHODS.find((m) => m.id === shipping);
  const delivery = shippingMethod?.price || 0;
  const gst = Math.round(Math.max(0, subtotal - discount) * 0.05);
  const total = Math.max(0, subtotal - discount + delivery + gst);

  const handleAddressSave = (addr) => {
    setAddress(addr);
    saveAddress(addr);
  };

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const order = placeOrder({
        items,
        address,
        shipping: shippingMethod,
        payment: PAYMENT_METHODS.find((p) => p.id === payment),
        totals: { subtotal, discount, delivery, gst, total },
      });
      clearCart();
      navigate(`/order-success/${order.id}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <>
        <Sidebar />
        <div style={{ marginLeft: "260px" }}>
          <Navbar />
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add products to your cart before checking out.</p>
            <Link to="/products" className="empty-btn">
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <div style={{ marginLeft: "260px" }}>
        <Navbar />

        <div className="checkout-page">

          <div className="checkout-head">
            <h1>Checkout</h1>
            <div className="checkout-steps">
              <span className="done">Cart</span>
              <ChevronRight size={14} />
              <span className="active">Address & Payment</span>
              <ChevronRight size={14} />
              <span>Order Success</span>
            </div>
          </div>

          <div className="checkout-layout">
            <div className="checkout-left">
              <AddressCard address={address} onSave={handleAddressSave} />

              <ShippingMethod selected={shipping} onChange={setShipping} />

              <PaymentMethod selected={payment} onChange={setPayment} />

              <div className="checkout-card gift-row">
                <label>
                  <input
                    type="checkbox"
                    checked={gift}
                    onChange={(e) => setGift(e.target.checked)}
                  />
                  <Gift size={18} />
                  This order is a gift
                </label>
              </div>

              <CouponBox
                applied={coupon}
                onCouponChange={() => force((n) => n + 1)}
              />
            </div>

            <div className="checkout-right">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                delivery={delivery}
                gst={gst}
                total={total}
                coupon={coupon?.code}
                onClearCoupon={() => {
                  clearCoupon();
                  force((n) => n + 1);
                }}
                deliveryLabel="Shipping"
                totalLabel="Grand Total"
                showButton={false}
              />

              <PlaceOrderButton
                total={total}
                placing={placing}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
