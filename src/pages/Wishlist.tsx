import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

import ProductGrid from "../components/products/ProductGrid";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

function Wishlist() {
  const { wishlistIds, toggleWishlist, addToCart } = useShop();

  const wishlistProducts = products.filter((product) =>
    wishlistIds.includes(product.id),
  );

  return (
    <section className="mx-auto min-h-[65vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-pink-600">
            <Heart size={17} />
            Your Favorites
          </div>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            All the products you love, saved in one place.
          </p>
        </div>

        <div className="sm:text-right">
          <span className="inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            {wishlistProducts.length} Saved Products
          </span>
        </div>
      </div>

      {wishlistProducts.length > 0 ? (
        <ProductGrid
          products={wishlistProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
      ) : (
        <div className="grid min-h-[350px] place-items-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-12 text-center">
          <div className="max-w-md">
            <div className="mx-auto mb-5 grid size-20 place-items-center rounded-full bg-pink-100">
              <Heart size={36} className="text-pink-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-gray-500">
              You haven't saved any products yet. Explore our collection and
              add your favorite products here.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Wishlist;