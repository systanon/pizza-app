import { defineStore } from 'pinia';
import type { Cart, CartItem } from '~/types/cart';

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartId = ref<string | null>(null);
    const cart = ref<Cart | null>(null);
    const loading = ref(false);

    const items = computed<CartItem[]>(() => cart.value?.items ?? []);

    const totalCount = computed(() =>
      items.value.reduce((sum, item) => sum + item.quantity, 0),
    );

    /** Total price in cents, as calculated by the backend */
    const totalPrice = computed(() => cart.value?.total ?? 0);

    return { cartId, cart, items, loading, totalCount, totalPrice };
  },
  {
    persist: {
      pick: ['cartId'],
    },
  },
);
