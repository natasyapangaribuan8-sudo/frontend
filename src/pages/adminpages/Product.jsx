
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useProducts } from "../../utils/ProductContext";
import ChocoBar from "../../components/ChocoBar";
import { palet } from "../../utils/data";

const LIMIT = 5;

// Menentukan warna cokelat berdasarkan nama dan kategori produk
function getProductPalette(product) {
  const nama = (
    (product.name || "") +
    " " +
    (product.category?.name || "")
  ).toLowerCase();

  if (nama.includes("ruby")) {
    return palet.ruby || palet.dark;
  }

  if (nama.includes("white")) {
    return palet.white || palet.dark;
  }

  if (nama.includes("milk")) {
    return palet.milk || palet.dark;
  }

  if (nama.includes("caramel")) {
    return palet.caramel || palet.milk || palet.dark;
  }

  return palet.dark;
}

export default function Product() {
  const {
    getProducts,
    getCategories,
    deleteProduct,
  } = useProducts();

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  const [filter, setFilter] = useState({
    category_id: "",
    keyword: "",
  });

  // Mengambil kategori
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Mengambil produk
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "list", page, filter],
    queryFn: () =>
      getProducts({
        page,
        limit: LIMIT,
        ...filter,
      }),
    placeholderData: (prev) => prev,
  });

  const items = data?.data ?? [];
  const lastPage = data?.last_page ?? 1;
  const totalProduk = data?.total ?? items.length;

  // Pencarian produk
  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);

    setFilter({
      category_id: categoryId,
      keyword: keywordInput.trim(),
    });
  };

  // Hapus produk
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Apakah kamu yakin ingin menghapus produk ini?"
      )
    ) {
      return;
    }

    try {
      await deleteProduct.mutateAsync(id);

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Produk berhasil dihapus!");

      if (items.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch {
      toast.error("Gagal menghapus produk.");
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="bg-[#fffaf6] rounded-xl p-8 text-center text-[#895638]">
        Memuat data produk...
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="bg-[#fffaf6] rounded-xl p-8 text-center text-red-600">
        Gagal memuat data produk.
      </div>
    );
  }

  return (
    <div className="bg-[#fffaf6] rounded-xl shadow-sm border border-[#ead8ca] p-4 md:p-5">

      {/* JUDUL */}
      <h1 className="text-2xl font-bold text-[#70412a] mb-5">
        Manajemen Produk
      </h1>

      {/* FILTER DAN PENCARIAN */}
      <div className="mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

        <form
          onSubmit={handleSearch}
          className="flex flex-wrap gap-2"
        >
          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            className="border border-[#e5d4c6] rounded-lg px-3 py-2 bg-white text-[#70412a]"
          >
            <option value="">Semua Kategori</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={keywordInput}
            onChange={(e) =>
              setKeywordInput(e.target.value)
            }
            placeholder="Cari produk..."
            className="border border-[#e5d4c6] rounded-lg px-3 py-2 w-full sm:w-56 outline-none focus:ring-2 focus:ring-[#b78a6b]"
          />

          <button
            type="submit"
            className="bg-[#8b5739] hover:bg-[#70412a] text-white rounded-lg px-5 py-2"
          >
            Cari
          </button>
        </form>

        <Link
          to="/admin/add-product"
          className="bg-[#159b50] hover:bg-[#117c40] text-white rounded-lg px-4 py-2 text-center"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* TABEL PRODUK */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#ead8ca]">

          <thead>
            <tr className="bg-[#f3e5d8] text-[#70412a] text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Harga</th>
              <th className="p-3 border">Stok</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-[#a68a77]"
                >
                  Tidak ada produk.
                </td>
              </tr>
            )}

            {items.map((p, index) => {
              const habis = Number(p.stock) === 0;
              const warna = getProductPalette(p);

              return (
                <tr
                  key={p.id}
                  className="hover:bg-[#fcf5ef]"
                >

                  {/* NOMOR */}
                  <td className="p-3 border text-[#70412a]">
                    {(page - 1) * LIMIT + index + 1}
                  </td>

                  {/* GAMBAR COKELAT 3D */}
                  <td className="p-2 border">
                    <div className="w-20 h-20 rounded-xl bg-[#f3e6da] flex items-center justify-center p-1">
                      <ChocoBar
                        palet={warna}
                        habis={habis}
                        className="w-full h-full"
                      />
                    </div>
                  </td>

                  {/* NAMA PRODUK */}
                  <td className="p-3 border">
                    <p className="font-medium text-[#553522]">
                      {p.name}
                    </p>

                    <small className="text-[#987963]">
                      #{p.category?.name || "-"}
                    </small>
                  </td>

                  {/* HARGA */}
                  <td className="p-3 border text-[#70412a] whitespace-nowrap">
                    Rp.{" "}
                    {Number(p.price).toLocaleString("id-ID")}
                  </td>

                  {/* STOK */}
                  <td className="p-3 border">
                    <span
                      className={
                        habis
                          ? "text-red-600 font-semibold"
                          : "text-[#70412a]"
                      }
                    >
                      {p.stock}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="p-3 border whitespace-nowrap">
                    <Link
                      to={`/admin/edit-product/${p.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deleteProduct.isPending}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      Hapus
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">

        <button
          onClick={() =>
            setPage((p) => Math.max(1, p - 1))
          }
          disabled={page === 1}
          className="rounded-lg px-3 py-2 bg-[#f3e5d8] text-[#70412a] disabled:opacity-40"
        >
          Sebelumnya
        </button>

        {Array.from(
          { length: lastPage },
          (_, i) => i + 1
        ).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`rounded-lg px-4 py-2 ${
              n === page
                ? "bg-[#8b5739] text-white"
                : "bg-[#f3e5d8] text-[#70412a]"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() =>
            setPage((p) =>
              Math.min(lastPage, p + 1)
            )
          }
          disabled={page === lastPage}
          className="rounded-lg px-4 py-2 bg-[#8b5739] text-white disabled:opacity-40"
        >
          Berikutnya
        </button>

      </div>

      {/* JUMLAH PRODUK */}
      <p className="text-center text-sm text-[#987963] mt-4">
        Menampilkan {items.length} dari {totalProduk} produk
      </p>

    </div>
  );
}
