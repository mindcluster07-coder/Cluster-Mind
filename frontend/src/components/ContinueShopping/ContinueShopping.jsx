import "./ContinueShopping.css";
import RecentCard from "../RecentCard/RecentCard";
import { getProducts } from "../../services/products";

const products = getProducts().filter((p) =>
  [1, 4, 6, 8].includes(p.id)
);

export default function ContinueShopping() {
  return (
    <div className="continue">

      <div className="heading">
        <h2>🕒 Continue Shopping</h2>
        <button>View All</button>
      </div>

      <div className="scroll-products">
        {products.map((item) => (
          <RecentCard
            key={item.id}
            product={item}
          />
        ))}
      </div>

    </div>
  );
}
