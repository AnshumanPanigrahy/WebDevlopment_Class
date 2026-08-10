import { fetchDummyProducts } from '../db/productDb';
import { parseProducts } from '../models/productModel';

export function loadProducts() {
  return fetchDummyProducts().then((data) => parseProducts(data));
}
