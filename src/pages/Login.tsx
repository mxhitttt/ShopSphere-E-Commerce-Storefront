
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShoppingBag,
} from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="grid min-h-[75vh] grid-cols-1 items-center bg-gray-50 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="mx-auto grid w-full max-w-md gap-8">
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-gray-900 text-white">
            <ShoppingBag size={30} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue shopping with ShopSphere.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-12 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-center">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="size-4 accent-gray-900"
              />
              Remember me
            </label>

            <Link
              to="/login"
              className="text-left text-sm font-semibold text-gray-900 hover:underline sm:text-right"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-5 py-3.5 font-semibold text-white transition hover:bg-gray-700"
          >
            Sign In
          </button>

          {submitted && (
            <p
              role="status"
              className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
            >
              Form validated. Actual login requires authentication backend
              integration.
            </p>
          )}

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-gray-900 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden h-full min-h-[550px] overflow-hidden rounded-2xl bg-gray-900 p-10 text-white lg:grid lg:content-center">
        <div className="mx-auto max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            ShopSphere Experience
          </p>

          <h2 className="mt-6 text-4xl font-bold leading-tight">
            Discover products that match your style.
          </h2>

          <p className="mt-5 leading-7 text-gray-300">
            Explore your favorite collections, manage your wishlist, and
            enjoy a simple shopping experience.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-2xl font-bold">01</p>
              <p className="mt-2 text-sm text-gray-300">
                Explore Products
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-2xl font-bold">02</p>
              <p className="mt-2 text-sm text-gray-300">
                Shop Your Favorites
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
