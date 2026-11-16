
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";

import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  const { addToCart, wishlistIds, toggleWishlist } = useShop();

  if (!product) {
    return (
      <section className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="mt-3 text-gray-500">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-700"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const isWishlisted = wishlistIds.includes(product.id);

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft size={17} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={18} fill="currentColor" />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">
              Customer rating
            </span>
          </div>

          <p className="mt-7 text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-sm font-semibold text-gray-900">
              Product Color
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {product.color}
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Quantity
            </p>

            <div className="inline-flex items-center rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
                className="p-3 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={17} />
              </button>

              <span className="min-w-12 text-center font-semibold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
                className="p-3 text-gray-700 hover:bg-gray-100"
              >
                <Plus size={17} />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-4 font-semibold text-white transition hover:bg-gray-700"
            >
              <ShoppingBag size={19} />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center justify-center gap-2 rounded-lg border px-5 py-4 font-semibold transition ${
                isWishlisted
                  ? "border-pink-200 bg-pink-50 text-pink-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart
                size={19}
                fill={isWishlisted ? "currentColor" : "none"}
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-gray-200 pt-6 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">
                Secure Shopping
              </p>
              <p className="mt-1 text-sm text-gray-500">
                A simple and secure shopping experience.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">
                Easy Shopping
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Manage your cart and wishlist easily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
