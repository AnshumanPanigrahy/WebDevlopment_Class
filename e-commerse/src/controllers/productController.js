export function parseProducts(data) {
  return Array.isArray(data.products) ? data.products : [];
}
