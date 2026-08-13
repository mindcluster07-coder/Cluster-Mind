import { Sparkles } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../services/products";
import "./SuggestedProducts.css";

export default function SuggestedProducts({ excludeIds }) {
  const suggested = getProducts()
    .filter((p) => !excludeIds.includes(p.id))
    .slice(0, 4);

  return (
    <div className="suggested-section">
      <div className="suggested-head">
        <h2>
          <Sparkles size={22} />
          You may also like
        </h2>
        <span>Recommended by AI based on your cart</span>
      </div>

      <div className="suggested-grid">
        {suggested.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
