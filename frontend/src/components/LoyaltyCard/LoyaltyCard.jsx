import "./LoyaltyCard.css";
import { Sparkles } from "lucide-react";

export default function LoyaltyCard() {
  return (
    <div className="loyalty-card" id="loyalty">

      <div className="lc-top">
        <Sparkles size={20} />
        <span>ClusterMind Rewards</span>
      </div>

      <div className="lc-points">
        <span className="lc-star">⭐</span>
        <strong>2,450</strong>
        <span>Available Points</span>
      </div>

      <button>Redeem Now</button>

    </div>
  );
}
