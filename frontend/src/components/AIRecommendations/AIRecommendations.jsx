import "./AIRecommendations.css";
import { Sparkles, Star, ShoppingCart, BrainCircuit } from "lucide-react";
import { addToCart } from "../../services/cart";
import { getProductById } from "../../services/products";
import { useState } from "react";

const fmt = (n) => n.toLocaleString("en-IN");

const picks = [
  { id: 4, reason: "Because you browsed laptops 5 times this week" },
  { id: 3, reason: "Matches items in your headphone wishlist" },
  { id: 1, reason: "You viewed iPhones recently" },
  { id: 15, reason: "Popular among Premium customers" },
];

const items = picks
  .map((pick) => {
    const product = getProductById(pick.id);
    return product ? { ...product, reason: pick.reason } : null;
  })
  .filter(Boolean);

export default function AIRecommendations() {
  const [added, setAdded] = useState({});

  const handleAdd = (item) => {
    addToCart(item);
    setAdded((s) => ({ ...s, [item.id]: true }));
    setTimeout(() => setAdded((s) => ({ ...s, [item.id]: false })), 1500);
  };

  return (
    <div className="ai-recs" id="ai-recommendations">

      <div className="ai-recs-header">
        <div className="ai-title">
          <span className="ai-badge-ic"><BrainCircuit size={20} /></span>
          <div>
            <h2>AI Recommendations For You</h2>
            <p>Personalized products selected based on your behavior.</p>
          </div>
        </div>
      </div>

      <div className="ai-recs-grid">
        {items.map((item) => (
          <div className="ai-recs-card" key={item.id}>
            <span className="ai-pick">🤖 AI Pick</span>

            <div className="ai-recs-img">
              <img src={item.image} alt={item.name} />
            </div>

            <h3>{item.name}</h3>

            <p className="ai-reason">
              <Sparkles size={14} />
              {item.reason}
            </p>

            <div className="ai-recs-meta">
              <span className="ai-rating">
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                {item.rating}
              </span>
              <span className="ai-price">₹{fmt(item.price)}</span>
            </div>

            <button onClick={() => handleAdd(item)}>
              {added[item.id] ? (
                "✓ Added"
              ) : (
                <>
                  <ShoppingCart size={16} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
