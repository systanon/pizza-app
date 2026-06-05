export const API_URL = {
  products: '/products',
  categories: '/categories',
  cart: '/cart',
  orders: '/orders',
  product: (id: number) => `/products/${id}`,
  categoryAddons: (categoryId: number) => `/categories/${categoryId}/addons`,
  order: (id: number) => `/orders/${id}`,
  orderCheckout: (id: number) => `/orders/${id}/checkout`,
};
