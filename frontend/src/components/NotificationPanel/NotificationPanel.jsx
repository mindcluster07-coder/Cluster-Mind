import "./NotificationPanel.css";
import { Bell, Package, BadgePercent, Sparkles, Gift } from "lucide-react";

const notifications = [
  {
    title: "Order Updates",
    desc: "Your iPhone 15 has been shipped",
    icon: <Package size={18} />,
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  {
    title: "Personalized Offers",
    desc: "20% OFF on accessories — code ACCESS20",
    icon: <BadgePercent size={18} />,
    color: "#16A34A",
    bg: "#DCFCE7",
  },
  {
    title: "AI Recommendations",
    desc: "3 new products matched for you",
    icon: <Sparkles size={18} />,
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    title: "Loyalty Rewards",
    desc: "You earned 500 bonus points",
    icon: <Gift size={18} />,
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
];

export default function NotificationPanel() {
  return (
    <div className="notification-card" id="notifications">

      <div className="notif-head">
        <h2>
          <Bell size={20} />
          Notifications
        </h2>
        <span className="notif-badge">4 New</span>
      </div>

      <ul>
        {notifications.map((n, index) => (
          <li key={index}>
            <span className="notif-icon" style={{ background: n.bg, color: n.color }}>
              {n.icon}
            </span>
            <div>
              <strong>{n.title}</strong>
              <p>{n.desc}</p>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
