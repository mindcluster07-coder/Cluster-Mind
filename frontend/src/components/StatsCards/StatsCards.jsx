import "./StatsCards.css";
import {
  Package,
  Heart,
  Gift,
  BadgePercent,
} from "lucide-react";

const stats = [
  {
    title: "My Orders",
    value: "18",
    icon: <Package size={28} />,
    color: "#4F46E5",
  },
  {
    title: "Wishlist",
    value: "12",
    icon: <Heart size={28} />,
    color: "#EF4444",
  },
  {
    title: "Loyalty Points",
    value: "2450",
    icon: <Gift size={28} />,
    color: "#22C55E",
  },
  {
    title: "Coupons",
    value: "05",
    icon: <BadgePercent size={28} />,
    color: "#F59E0B",
  },
];

export default function StatsCards() {
  return (
    <div className="stats-container">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>

          <div
            className="icon-box"
            style={{ background: item.color }}
          >
            {item.icon}
          </div>

          <div className="details">
            <h4>{item.title}</h4>
            <h2>{item.value}</h2>
          </div>

        </div>
      ))}
    </div>
  );
}
