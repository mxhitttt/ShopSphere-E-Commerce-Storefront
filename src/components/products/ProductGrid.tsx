
import type { Product } from "../../data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  wishlistIds?: number[];
  onToggleWishlist?: (id: number) => void;
  onAddToCart?: (product: Product) => void;
}

function ProductGrid({
  products,
  wishlistIds = [],
  onToggleWishlist,
  onAddToCart,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          No products found
        </h3>
        <p className="mt-2 text-gray-500">
          Try changing your search or category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlistIds.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
