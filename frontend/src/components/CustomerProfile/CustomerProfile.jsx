import "./CustomerProfile.css";
import {
  Crown,
  Layers,
  CalendarDays,
  IndianRupee,
  Gift,
  Sparkles,
} from "lucide-react";

const items = [
  { icon: <Crown size={18} />, label: "Customer Type", value: "Premium Customer" },
  { icon: <Layers size={18} />, label: "Favorite Category", value: "Electronics" },
  { icon: <CalendarDays size={18} />, label: "Shopping Frequency", value: "2x per week" },
  { icon: <IndianRupee size={18} />, label: "Average Order Value", value: "₹4,850" },
  { icon: <Gift size={18} />, label: "Loyalty Points", value: "2,450 pts" },
];

export default function CustomerProfile() {
  return (
    <div className="shopping-profile">
      <div className="sp-header">
        <Sparkles size={18} />
        <h3>Your Shopping Profile</h3>
      </div>

      <div className="sp-list">
        {items.map((item, index) => (
          <div className="sp-item" key={index}>
            <span className="sp-icon">{item.icon}</span>
            <div>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
