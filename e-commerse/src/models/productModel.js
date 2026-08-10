export function createProduct(raw) {
  return {
    id: raw.id,
    name: raw.title,
    description: raw.description,
    category: raw.category,
    brand: raw.brand || 'Everyday edit',
    price: Number(raw.price) || 0,
    discount: Number(raw.discountPercentage) || 0,
    rating: Number(raw.rating) || 0,
    stock: Number(raw.stock) || 0,
    image: raw.thumbnail || raw.images?.[0],
  };
}

export function parseProducts(data) {
  if (!data || !Array.isArray(data.products)) return [];
  return data.products.map(createProduct);
}
