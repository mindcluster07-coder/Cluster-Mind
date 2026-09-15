import "./CategoryList.css";

const categoryIcons = {
  Electronics: "⚡",
  Fashion: "👕",
  Grocery: "🛒",
  Beauty: "💄",
  Shoes: "👟",
  Laptop: "💻",
};

export default function CategoryList({ categories, selected, onSelect }) {
  return (
    <div className="category-list">
      <button
        className={`category-chip ${selected === "All" ? "active" : ""}`}
        onClick={() => onSelect("All")}
      >
        🏷️ All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={`category-chip ${selected === category ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {categoryIcons[category] || "🛍️"} {category}
        </button>
      ))}
    </div>
  );
}
