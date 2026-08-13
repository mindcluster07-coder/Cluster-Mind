import { useState } from "react";
import { Star, ThumbsUp, BadgeCheck, PenLine } from "lucide-react";
import { getProductReviews } from "../../services/products";
import "./ProductDetails.css";

export default function ProductReviews({ product }) {
  const reviews = getProductReviews(product);
  const [helpful, setHelpful] = useState({});

  return (
    <div className="reviews-section">
      <div className="reviews-head">
        <h2>⭐ Customer Reviews</h2>
        <button className="write-review">
          <PenLine size={16} />
          Write Review
        </button>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-top">
              <div className="avatar">{review.name[0]}</div>
              <div>
                <h4>
                  {review.name}
                  {review.verified && (
                    <span className="verified">
                      <BadgeCheck size={14} /> Verified Purchase
                    </span>
                  )}
                </h4>
                <div className="review-meta">
                  <span className="stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= review.rating ? "#F59E0B" : "#E2E8F0"}
                        color={s <= review.rating ? "#F59E0B" : "#E2E8F0"}
                      />
                    ))}
                  </span>
                  <span className="date">{review.date}</span>
                </div>
              </div>
            </div>

            <h5>{review.title}</h5>
            <p>{review.comment}</p>

            <button
              className={`helpful-btn ${helpful[review.id] ? "active" : ""}`}
              onClick={() =>
                setHelpful((prev) => ({
                  ...prev,
                  [review.id]: !prev[review.id],
                }))
              }
            >
              <ThumbsUp size={15} />
              Helpful ({review.helpful + (helpful[review.id] ? 1 : 0)})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
