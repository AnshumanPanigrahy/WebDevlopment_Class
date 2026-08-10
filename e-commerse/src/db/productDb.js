const API_URL = 'https://dummyjson.com/products?limit=0';

export async function fetchDummyProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Unable to reach the products service.');
  }

  return response.json();
}
