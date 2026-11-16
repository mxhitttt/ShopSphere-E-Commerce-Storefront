
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import ProductGrid from "../components/products/ProductGrid";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

type SortOption = "featured" | "price-low" | "price-high" | "rating";

function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] =
    useState<SortOption>("featured");

  const { wishlistIds, addToCart, toggleWishlist } = useShop();

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [],
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortOption]);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
            Explore our collection
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
            Shop All Products
          </h1>

          <p className="mt-3 text-slate-500">
            Discover products selected for your everyday lifestyle.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 md:max-w-md">
            <Search size={20} className="text-slate-400" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <SlidersHorizontal size={18} />

            Sort by

            <select
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as SortOption)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-950"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredProducts.length} products
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSortOption("featured");
            }}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Clear filters
          </button>
        </div>

        <ProductGrid
          products={filteredProducts}
          wishlistIds={wishlistIds}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
        />
      </div>
    </main>
  );
}

export default Shop;
