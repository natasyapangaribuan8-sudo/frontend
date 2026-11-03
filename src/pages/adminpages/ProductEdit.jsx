import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct, getProductById, getCategories } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    img: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: product, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // isi form setelah data produk datang
  useEffect(() => {
    if (!product) return;
    setFormData({
      name: product.name ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      category_id: product.category_id ?? "",
      description: product.description ?? "",
      img: null,
    });
    setPreview(product.img_url ?? null);
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      if (files[0]) setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") data.append(key, value);
    });

    try {
      await updateProduct(id, data);
      toast.success("Produk berhasil diperbarui!");
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("⚠ Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("❌ Gagal memperbarui produk.");
      }
    }
  };

  const inputClass = (field) =>
    `border rounded-md p-2 w-full ${errors[field] ? "border-red-500" : ""}`;

  const errorText = (field) =>
    errors[field] ? <p className="text-red-500 text-sm mt-1">{errors[field][0]}</p> : null;

  if (isError) return <p>Produk tidak ditemukan.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Edit Produk</h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Nama Produk</label>
        <input name="name" value={formData.name} onChange={handleChange} className={inputClass("name")} />
        {errorText("name")}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Pilih Kategori</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange} className={inputClass("category_id")}>
          <option value="">-- Pilih Kategori --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errorText("category_id")}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Harga</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} className={inputClass("price")} />
        {errorText("price")}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Stok</label>
        <input name="stock" type="number" value={formData.stock} onChange={handleChange} className={inputClass("stock")} />
        {errorText("stock")}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Deskripsi</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="border border-gray-300 rounded-lg p-2 resize-none"
        />
      </div>

      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />}

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Ganti Gambar (opsional)</label>
        <input
          name="img"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 bg-gray-50"
        />
        {errorText("img")}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Simpan Perubahan
      </button>
    </form>
  );
}