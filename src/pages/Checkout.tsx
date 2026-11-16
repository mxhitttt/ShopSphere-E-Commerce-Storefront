
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";

import { useShop } from "../context/ShopContext";

function Checkout() {
  const { cart, subtotal } = useShop();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitted, setSubmitted] = useState(false);

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (cart.length === 0) {
    return (
      <section className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div>
          <ShoppingBag size={48} className="mx-auto text-gray-400" />
          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-3 text-gray-500">
            Add some products before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-lg bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-700"
          >
            Explore Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-medium text-gray-500">
          ShopSphere / Checkout
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-gray-500">
          Complete your delivery and payment details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3"
      >
        <div className="grid gap-8 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-gray-900">
              Contact Information
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  title="Enter a valid 10-digit phone number"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-gray-900">
              Delivery Address
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="House number, street, area"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                  PIN Code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="6-digit PIN code"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-gray-900">
              Payment Method
            </h2>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="size-4 accent-gray-900"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  Cash on Delivery
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Pay when your order arrives.
                </p>
              </div>
            </label>
          </div>
        </div>

        <aside className="grid gap-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="grid gap-5">
            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-16 rounded-lg bg-gray-100 object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 border-t border-gray-200 pt-5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-4 font-semibold text-white transition hover:bg-gray-700"
          >
            <Lock size={17} />
            Confirm Details
          </button>

          {submitted && (
            <p
              role="status"
              className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
            >
              Your details passed validation. Actual order placement requires
              backend integration.
            </p>
          )}

          <p className="text-center text-xs text-gray-500">
            Review your details before continuing.
          </p>

          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
        </aside>
      </form>
    </section>
  );
}

export default Checkout;
