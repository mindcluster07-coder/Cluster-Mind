import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CategoryList from "../../components/CategoryList/CategoryList";
import ProductSearch from "../../components/ProductSearch/ProductSearch";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import {
  getCategories,
  getBrands,
  getProducts,
} from "../../services/products";

const emptyFilters = {
  brands: [],
  price: "",
  ratings: [],
  availability: "",
};

export default function Products() {
  const categories = useMemo(() => getCategories(), []);
  const brands = useMemo(() => getBrands(), []);

  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [showFilter, setShowFilter] = useState(false);

  const products = useMemo(
    () =>
      getProducts({
        search: query,
        category,
        ...filters,
      }),
    [query, category, filters]
  );

  const clearAll = () => {
    setFilters(emptyFilters);
    setQuery("");
    setCategory("All");
  };

  return (
    <>
      <Sidebar />

      <div style={{ marginLeft: "260px" }}>
        <Navbar />

        <div className="products-page">

          <div className="products-head">
            <h1>Products</h1>
            <span>{products.length} products found</span>
          </div>

          <CategoryList
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />

          <div className="products-toolbar">
            <ProductSearch
              value={query}
              onChange={setQuery}
              onClear={() => setQuery("")}
            />

            <button
              className="filter-toggle"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal size={18} />
              Filters
              {showFilter && <X size={16} />}
            </button>
          </div>

          <div className="products-layout">
            <div className={showFilter ? "filter-col visible" : "filter-col"}>
              <ProductFilter
                brands={brands}
                filters={filters}
                onFilterChange={setFilters}
                onClear={clearAll}
              />
            </div>

            <ProductGrid products={products} />
          </div>

        </div>
      </div>
    </>
  );
}
