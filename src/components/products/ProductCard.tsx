
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: number) => void;
  onAddToCart?: (product: Product) => void;
}

function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => onToggleWishlist?.(product.id)}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <Heart
            size={19}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-2 font-semibold text-gray-900 transition hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <Star size={15} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
