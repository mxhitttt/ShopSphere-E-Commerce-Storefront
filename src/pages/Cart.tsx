
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useShop();

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 rounded-full bg-gray-100 p-6">
          <ShoppingBag size={42} className="text-gray-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-3 text-gray-500">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link
          to="/shop"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
        >
          Continue Shopping
          <ArrowRight size={18} />
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-medium text-gray-500">Your Shopping Bag</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>
        <p className="mt-2 text-gray-500">
          You have {cart.length} different products in your cart.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-full rounded-lg bg-gray-100 object-cover sm:w-32"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <Link
                    to={`/product/${item.id}`}
                    className="mt-1 block font-semibold text-gray-900 hover:text-gray-600"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-2 font-semibold text-gray-900">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-9 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label={`Increase quantity of ${item.name}`}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 pt-3 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowRight size={16} className="rotate-180" />
            Continue Shopping
          </Link>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>

            {subtotal > 0 && subtotal < 2999 && (
              <p className="text-xs text-gray-500">
                Add {formatPrice(2999 - subtotal)} more to get free shipping.
              </p>
            )}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>

          <p className="mt-4 text-center text-xs text-gray-500">
            Secure checkout experience
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
