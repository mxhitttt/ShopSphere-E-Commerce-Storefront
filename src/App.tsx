
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ShopProvider from "./context/ShopContext";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
