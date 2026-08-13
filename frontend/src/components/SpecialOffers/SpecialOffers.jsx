import "./SpecialOffers.css";
import {
  BadgePercent,
  Truck,
  Gift,
  CreditCard,
  Sparkles,
} from "lucide-react";

const offers = [
  {
    title: "20% OFF",
    subtitle: "On All Accessories",
    code: "ACCESS20",
    icon: <BadgePercent size={22} />,
    color: "#2563EB",
    bg: "#DBEAFE",
    light: "#EFF6FF",
  },
  {
    title: "Free Shipping",
    subtitle: "On Orders Above ₹999",
    icon: <Truck size={22} />,
    color: "#16A34A",
    bg: "#DCFCE7",
    light: "#F0FDF4",
  },
  {
    title: "Loyalty Bonus",
    subtitle: "Earn 500 Extra Points",
    icon: <Gift size={22} />,
    color: "#F59E0B",
    bg: "#FEF3C7",
    light: "#FFFBEB",
  },
  {
    title: "Bank Offer",
    subtitle: "10% Instant Discount",
    icon: <CreditCard size={22} />,
    color: "#EC4899",
    bg: "#FCE7F3",
    light: "#FDF2F8",
  },
];

export default function SpecialOffers() {
  return (
    <div className="offers-section" id="offers">

      <div className="section-title">
        <div>
          <h2>Personalized Offers</h2>
          <p>Exclusive deals tailored just for you</p>
        </div>
      </div>

      <div className="offers-grid">
        {offers.map((offer, index) => (
          <div
            className="offer-card"
            key={index}
            style={{ background: offer.light, borderColor: offer.bg }}
          >
            <div className="offer-icon" style={{ background: offer.bg, color: offer.color }}>
              {offer.icon}
            </div>
            <div className="offer-body">
              <h3 style={{ color: offer.color }}>{offer.title}</h3>
              <p>{offer.subtitle}</p>
            </div>
            {offer.code && (
              <span className="offer-code">
                <Sparkles size={12} />
                {offer.code}
              </span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
