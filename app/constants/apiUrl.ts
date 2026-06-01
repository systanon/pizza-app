export const API_URL = {
  products: '/products',
  categories: '/categories',
  cart: '/cart',
  product: (id: number) => `/products/${id}`,
  categoryAddons: (categoryId: number) => `/categories/${categoryId}/addons`,
};
