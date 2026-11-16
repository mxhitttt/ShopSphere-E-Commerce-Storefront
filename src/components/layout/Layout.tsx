
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ShopSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
