import products from "../data/products";

const catalog = [...products];

const IMAGE_KEY = "clustermind_product_images";

const readImageOverrides = () => {
  try {
    return JSON.parse(localStorage.getItem(IMAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveImageOverrides = (map) => {
  localStorage.setItem(IMAGE_KEY, JSON.stringify(map));
};

export const getUploadedImage = (id) => readImageOverrides()[String(id)] || "";

export const setProductImage = (id, dataUrl) => {
  const map = readImageOverrides();
  map[String(id)] = dataUrl;
  saveImageOverrides(map);
};

export const resetProductImage = (id) => {
  const map = readImageOverrides();
  delete map[String(id)];
  saveImageOverrides(map);
};

const withOverride = (p) => {
  if (!p) return p;
  const uploaded = getUploadedImage(p.id);
  return uploaded ? { ...p, image: uploaded } : p;
};

export const getCategories = () => [
  ...new Set(catalog.map((p) => p.category)),
];

export const getBrands = () => [
  ...new Set(catalog.map((p) => p.brand)),
];

export const getProducts = ({
  search = "",
  category = "All",
  brands = [],
  price = "",
  ratings = [],
  availability = "",
} = {}) => {
  let list = [...catalog];

  if (category && category !== "All") {
    list = list.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (brands.length) {
    list = list.filter((p) => brands.includes(p.brand));
  }

  if (price) {
    if (price === "under500") list = list.filter((p) => p.price < 500);
    else if (price === "500-5000") list = list.filter((p) => p.price >= 500 && p.price <= 5000);
    else if (price === "5000-20000") list = list.filter((p) => p.price > 5000 && p.price <= 20000);
    else if (price === "above20000") list = list.filter((p) => p.price > 20000);
  }

  if (ratings.length) {
    list = list.filter((p) => p.rating >= Math.max(...ratings));
  }

  if (availability) {
    list = list.filter((p) => (availability === "instock" ? p.inStock : !p.inStock));
  }

  return list.map(withOverride);
};

export const getProductById = (id) =>
  withOverride(catalog.find((p) => p.id === Number(id)));

export const searchProducts = (q) =>
  getProducts({ search: q });

export const getGallery = (product) => [
  product.image,
  product.image,
  product.image,
];

export const getSpecifications = (product) => [
  ["Brand", product.brand],
  ["Model", product.name],
  ["Category", product.category],
  ["Color", "Black / Blue / White"],
  ["In The Box", "1 Product, Charging Cable, Documentation"],
  ["Warranty", "1 Year Manufacturer Warranty"],
  ["Country of Origin", "India"],
  ["Item Weight", "280 g"],
];

export const getProductReviews = () => [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "12 Jul 2026",
    title: "Excellent product",
    comment: "Amazing build quality and performance. Battery easily lasts a full day.",
    helpful: 124,
    verified: true,
  },
  {
    id: 2,
    name: "Priya Patil",
    rating: 4,
    date: "28 Jun 2026",
    title: "Very good",
    comment: "Battery backup is amazing. Slightly heavy but worth the price.",
    helpful: 87,
    verified: true,
  },
  {
    id: 3,
    name: "Amit Verma",
    rating: 5,
    date: "15 Jun 2026",
    title: "Worth every rupee",
    comment: "Smooth performance, great display and the camera is brilliant.",
    helpful: 56,
    verified: false,
  },
];

export const getSimilarProducts = (product) => {
  const similar = catalog.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category || p.brand === product.brand)
  );
  if (similar.length >= 4) return similar.slice(0, 4).map(withOverride);
  const rest = catalog.filter(
    (p) => p.id !== product.id && !similar.includes(p)
  );
  return [...similar, ...rest].slice(0, 4).map(withOverride);
};

export const getBoughtTogether = (product) => {
  const bundleIds = product.category === "Electronics"
    ? [4, 6, 7]
    : [4, 6, 7];
  const bundle = bundleIds
    .map((id) => catalog.find((p) => p.id === id))
    .filter(Boolean);
  return [product, ...bundle].map(withOverride);
};
