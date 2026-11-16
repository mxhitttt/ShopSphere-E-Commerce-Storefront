
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";

import ProductGrid from "../components/products/ProductGrid";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

type SortOption = "featured" | "price-low" | "price-high" | "rating";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] =
    useState<SortOption>("featured");

  const {
    wishlistIds,
    addToCart,
    toggleWishlist,
  } = useShop();

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [],
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

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
    <div className="bg-white text-slate-900">
      {/* Announcement Bar */}
      <div className="bg-slate-950 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white">
        FREE SHIPPING ON ORDERS OVER ₹2,999
      </div>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20"
        >
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-600">
              Your everyday, upgraded
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Find your
              <br />
              next{" "}
              <span className="text-orange-500">
                favorite.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-500 sm:text-lg">
              Thoughtfully selected essentials, timeless designs,
              and everyday products made to fit your lifestyle.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Explore collection
              <ArrowRight size={18} />
            </Link>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500">
              <span>✓ Quality essentials</span>
              <span>✓ Easy returns</span>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90"
              alt="Modern retail storefront"
              fetchPriority="high"
              className="h-[360px] w-full rounded-3xl object-cover sm:h-[480px]"
            />

            <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl sm:bottom-7 sm:left-7">
              <p className="text-xs text-slate-500">
                Curated for you
              </p>

              <p className="mt-1 text-lg font-bold">
                The new essentials
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="products"
          className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  The collection
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Popular right now
                </h2>

                <p className="mt-3 text-slate-500">
                  {filteredProducts.length} products to explore
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium">
                Sort by

                <select
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(event.target.value as SortOption)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to high</option>
                  <option value="price-high">Price: High to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>

            {/* Search */}
            <label className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-orange-500">
              <Search size={20} className="shrink-0 text-slate-400" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search sneakers, watches, bags..."
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>

            {/* Categories */}
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
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

            {/* Product Grid */}
            <div className="mt-8">
              <ProductGrid
                products={filteredProducts}
                wishlistIds={wishlistIds}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3 font-semibold transition hover:border-orange-500 hover:text-orange-500"
              >
                View all products
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          id="benefits"
          className="px-5 py-16 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
            <div>
              <Truck className="text-orange-500" size={30} />

              <h3 className="mt-4 font-bold">
                Delivery made easy
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                A straightforward experience from browsing to delivery.
              </p>
            </div>

            <div>
              <Heart className="text-orange-500" size={30} />

              <h3 className="mt-4 font-bold">
                Thoughtful selection
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Discover a curated collection of everyday essentials.
              </p>
            </div>

            <div>
              <ShoppingBag className="text-orange-500" size={30} />

              <h3 className="mt-4 font-bold">
                Easy shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                A responsive storefront for desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
