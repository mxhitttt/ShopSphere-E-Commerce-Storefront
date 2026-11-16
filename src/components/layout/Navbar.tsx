
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Heart,
  Menu,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, wishlistIds } = useShop();

  const closeMenu = () => setIsMenuOpen(false);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-indigo-600"
        : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Shop<span className="text-indigo-600">Sphere</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={getNavClass}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
          >
            <UserRound size={19} />
            Login
          </Link>

          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistIds.length} items`}
            className="relative text-gray-600 transition-colors hover:text-indigo-600"
          >
            <Heart size={21} />
            {wishlistIds.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className="relative text-gray-600 transition-colors hover:text-indigo-600"
          >
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={getNavClass}
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              <UserRound size={19} />
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Create Account
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              <Heart size={19} />
              Wishlist ({wishlistIds.length})
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              <ShoppingBag size={19} />
              Cart ({cartCount})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
