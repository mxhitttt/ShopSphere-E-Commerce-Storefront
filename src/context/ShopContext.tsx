
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlistIds: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  cartCount: number;
  subtotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

interface ShopProviderProps {
  children: ReactNode;
}

function ShopProvider({ children }: ShopProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("shopsphere-cart");
      return savedCart ? JSON.parse(savedCart) as CartItem[] : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    try {
      const savedWishlist = localStorage.getItem("shopsphere-wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) as number[] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-wishlist",
      JSON.stringify(wishlistIds),
    );
  }, [wishlistIds]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id),
    );
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const toggleWishlist = (id: number) => {
    setWishlistIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((itemId) => itemId !== id)
        : [...currentIds, id],
    );
  };

  const isWishlisted = (id: number) => wishlistIds.includes(id);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      cart,
      wishlistIds,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isWishlisted,
      cartCount,
      subtotal,
    }),
    [cart, wishlistIds, cartCount, subtotal],
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}

export default ShopProvider;
