import "./TrendingCategories.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { BookOpen, Puzzle, Car } from "lucide-react";

import electronics from "../../assets/categories/electronics.svg";
import fashion from "../../assets/categories/fashion.svg";
import home from "../../assets/categories/home.svg";
import beauty from "../../assets/categories/beauty.svg";
import sports from "../../assets/categories/sports.svg";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    items: 250,
    image: electronics,
    color: "#DBEAFE",
  },
  {
    id: "fashion",
    name: "Fashion",
    items: 180,
    image: fashion,
    color: "#FCE7F3",
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    items: 210,
    image: home,
    color: "#DCFCE7",
  },
  {
    id: "beauty",
    name: "Beauty",
    items: 95,
    image: beauty,
    color: "#FCE7F3",
  },
  {
    id: "sports",
    name: "Sports",
    items: 140,
    image: sports,
    color: "#FEF3C7",
  },
  {
    id: "books",
    name: "Books",
    items: 320,
    icon: <BookOpen size={34} color="#7C3AED" />,
    color: "#EDE9FE",
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    items: 110,
    icon: <Puzzle size={34} color="#0F766E" />,
    color: "#CCFBF1",
  },
  {
    id: "automotive",
    name: "Automotive",
    items: 76,
    icon: <Car size={34} color="#2563EB" />,
    color: "#E0F2FE",
  },
];

export default function TrendingCategories() {
  return (
    <div className="trending">
      <div className="title">
        <div>
          <h2>Trending Categories</h2>
          <p>Explore what&apos;s popular right now</p>
        </div>
        <button>View All</button>
      </div>

      <div className="category-grid">
        {categories.map((item, index) => (
          <CategoryCard key={index} category={item} />
        ))}
      </div>
    </div>
  );
}
