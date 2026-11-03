import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AboutPage from "./pages/adminpages/AboutPage";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="add-product" element={<ProductForm />} />
        <Route path="edit-product/:id" element={<ProductEdit />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}