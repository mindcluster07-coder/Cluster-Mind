import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Sparkles, Truck, Zap, PackageX } from "lucide-react";
import { addToCart } from "../../services/cart";
import { addToWishlist, removeFromWishlist } from "../../services/wishlist";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    if (!product.inStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product, 1);
    navigate("/checkout");
  };

  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
      setLiked(false);
    } else {
      addToWishlist(product);
      setLiked(true);
    }
  };

  return (
    <div className="product-card">

      {product.aiRecommended && (
        <div className="ai-badge">
          <Sparkles size={13} />
          AI Recommended
        </div>
      )}

      <button
        className="wishlist-button"
        onClick={toggleWishlist}
        aria-label="Add to wishlist"
      >
        <Heart
          size={18}
          fill={liked ? "#EF4444" : "none"}
          color={liked ? "#EF4444" : "#475569"}
        />
      </button>

      <div className="product-image-container">
        {imgError ? (
          <div className="product-image-fallback">
            <PackageX size={44} color="#94A3B8" />
            <span>{product.category}</span>
          </div>
        ) : (
          <Link to={`/products/${product.id}`} aria-label={product.name}>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="product-image"
              onError={() => setImgError(true)}
            />
          </Link>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <Link to={`/products/${product.id}`} className="product-title-link">
          <h3>{product.name}</h3>
        </Link>

        <div className="product-rating">
          <span className="rating-box">
            <Star size={13} fill="currentColor" />
            {product.rating}
          </span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <span>₹{product.oldPrice.toLocaleString("en-IN")}</span>
          <b>{product.discount}% OFF</b>
        </div>

        {product.freeDelivery && (
          <div className="free-delivery">
            <Truck size={15} />
            Free Delivery
          </div>
        )}

        {!product.inStock && (
          <p className="out-of-stock">Out of Stock</p>
        )}

        <div className="product-buttons">
          <button
            className="add-cart-button"
            onClick={handleAdd}
            disabled={!product.inStock}
          >
            <ShoppingCart size={16} />
            {added ? "Added" : "Add to Cart"}
          </button>

          <button
            className="buy-now-button"
            onClick={handleBuyNow}
            disabled={!product.inStock}
          >
            <Zap size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
