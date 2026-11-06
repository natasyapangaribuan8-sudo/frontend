
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

// Halaman Admin
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import Product from "./pages/adminpages/Product";
import AboutPage from "./pages/adminpages/AboutPage";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";

// Halaman User
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";

export default function App() {
  return (
    <Routes>

      {/* HALAMAN USER */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* HALAMAN ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="product"
          element={<Product />}
        />

        <Route
          path="about"
          element={<AboutPage />}
        />

        <Route
          path="add-product"
          element={<ProductForm />}
        />

        <Route
          path="edit-product/:id"
          element={<ProductEdit />}
        />
      </Route>

      {/* URL TIDAK DIKENAL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}
