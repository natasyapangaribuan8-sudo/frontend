
import { useProducts } from "../../utils/ProductContext";

export default function AdminDashboard() {
  const { products = [], isLoading } = useProducts();

  const totalProduk = products.length;

  const totalStok = products.reduce(
    (total, produk) =>
      total + Number(produk.stock || 0),
    0
  );

  const stokHabis = products.filter(
    (produk) => Number(produk.stock) === 0
  ).length;

  const stats = [
    { label: "Total Produk", value: totalProduk, icon: "🍫" },
    { label: "Total Stok", value: totalStok, icon: "📦" },
    { label: "Stok Habis", value: stokHabis, icon: "⚠️" },
  ];

  return (
    <div className="space-y-6">

      <div className="bg-[#8b5739] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Dashboard Toko Coklat 🍫
        </h1>

        <p className="text-[#f3dfd0] mt-2">
          Selamat datang di halaman admin Toko Coklat.
        </p>
      </div>

      {isLoading ? (
        <p className="text-[#895638]">
          Memuat data produk...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#fffaf6] border border-[#ead8ca] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-[#9b7966]">
                    {stat.label}
                  </p>

                  <p className="text-3xl font-bold text-[#895638] mt-2">
                    {stat.value.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="w-14 h-14 bg-[#f3e5d8] rounded-xl flex items-center justify-center text-3xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
