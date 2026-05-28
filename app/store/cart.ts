import { defineStore } from 'pinia';
import type { Cart, CartItem } from '~/types/cart';

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartId = ref<string | null>(null);
    const cart = ref<Cart | null>(null);
    const loading = ref(false);

    const items = computed<CartItem[]>(() => cart.value?.items ?? []);

    const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

    const totalPrice = computed(() =>
      items.value.reduce((sum, item) => {
        const variantPrice = item.variant_price ?? 0;
        const addonsPrice = item.addons.reduce((s, a) => s + a.price, 0);
        return sum + (variantPrice + addonsPrice) * item.quantity;
      }, 0),
    );

    return { cartId, cart, items, loading, totalCount, totalPrice };
  },
  {
    persist: {
      pick: ['cartId'],
    },
  },
);
