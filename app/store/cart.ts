import { defineStore } from 'pinia';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image_url: string;
  size?: string;
}

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([]);

    const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

    const totalPrice = computed(() =>
      items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
    );

    function addItem(product: Omit<CartItem, 'quantity'>, qty = 1) {
      const existing = items.value.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += qty;
      } else {
        items.value.push({ ...product, quantity: qty });
      }
    }

    function removeItem(id: number) {
      items.value = items.value.filter((i) => i.id !== id);
    }

    function updateQuantity(id: number, quantity: number) {
      const item = items.value.find((i) => i.id === id);
      if (item) {
        quantity > 0 ? (item.quantity = quantity) : removeItem(id);
      }
    }

    function clear() {
      items.value = [];
    }

    return { items, totalCount, totalPrice, addItem, removeItem, updateQuantity, clear };
  },
  {
    persist: true,
  },
);
