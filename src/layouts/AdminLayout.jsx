
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const link = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-[#f3e5d8] text-[#895638] font-bold"
        : "text-[#79543e] hover:bg-[#f8eee6]"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5e9df]">

      {/* HEADER */}
      <header className="bg-[#8b5739] px-6 py-4 flex items-center justify-between border-b-2 border-[#d9b59d]">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            🍫 Toko Coklat
          </h1>
          <p className="text-[#f3dfd0] text-sm">
            Admin Panel - Kelola Toko Coklat
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white text-sm">
            Halo, Natasya 👋
          </span>

          <div className="w-12 h-12 rounded-full bg-[#f3e5d8] text-[#895638] font-bold flex items-center justify-center">
            N
          </div>
        </div>
      </header>

      {/* SIDEBAR DAN KONTEN */}
      <div className="flex flex-1 flex-col md:flex-row">

        <aside className="w-full md:w-64 bg-[#fffaf6] p-4 border-r border-[#ead8ca]">

          <p className="text-xs font-bold text-[#b18b72] uppercase tracking-wider px-4 mb-3">
            Menu Utama
          </p>

          <nav className="space-y-2">

            <NavLink
              to="/admin/dashboard"
              end
              className={link}
            >
              🏠 Dashboard
            </NavLink>

            <NavLink
              to="/admin/product"
              className={link}
            >
              🍫 Produk
            </NavLink>

            <NavLink
              to="/admin/about"
              className={link}
            >
              ℹ️ About
            </NavLink>

          </nav>

          <div className="mt-8 bg-[#f5e9df] rounded-xl p-4">
            <h3 className="font-bold text-[#70412a]">
              Toko Coklat 🍫
            </h3>

            <p className="text-sm text-[#9b7966] mt-1">
              Coklat terbaik untuk setiap momen.
            </p>
          </div>

        </aside>

        <main className="flex-1 min-w-0 p-4 md:p-6">
          <Outlet />
        </main>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#8b5739] text-white text-center py-4 text-sm">
        © 2026 Toko Coklat | Version 1.0
      </footer>

    </div>
  );
}
