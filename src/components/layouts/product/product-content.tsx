import ProductCard from "./product-card";

const products = [
  {
    name: "Garansi Indonesia",
    description:
      "Garansi Indonesia adalah program garansi yang dikeluarkan oleh pemerintah Indonesia.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com",
    created_at: "2021-09-01",
  },
  {
    name: "Academy Mastership",
    description:
      "Academy Mastership adalah program pelatihan yang dikeluarkan oleh pemerintah Indonesia.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com",
    created_at: "2021-09-02",
  },
  {
    name: "Qlove",
    description:
      "Qlove adalah website untuk jual beli kostum cosplay dan aksesoris.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com",
    created_at: "2021-09-03",
  },
  {
    name: "Smart Jimpitan App",
    description: "Smart Jimpitan App adalah aplikasi untuk mengelola keuangan.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com",
    created_at: "2021-09-04",
  },
  {
    name: "Sunat Ceria",
    description:
      "Sunat Ceria adalah sebuah website untuk mengelola kegiatan sunatan.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com",
    created_at: "2021-09-04",
  },
  {
    name: "Moby Park",
    description:
      "Moby Park adalah website untuk booking tempat pariwisata dan mengelola pembookingan, acara, dan pembayaran.",
    thumbnail: "https://via.placeholder.com/150",
    url: "https://example.com",
    created_at: "2021-09-04",
  },
];

const ProductContent = () => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </section>
  );
};

export default ProductContent;
