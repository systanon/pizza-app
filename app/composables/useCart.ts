import { storeToRefs } from 'pinia';
import { AppSuccess } from '~/types/app';
import { AppBaseError } from '~/types/app-errors';
import type { CreateCartItemRequest } from '~/types/cart';
import { useCartStore } from '~/store/cart';

export function useCart() {
  const store = useCartStore();
  const { cartId, cart, items, loading, totalCount, totalPrice } = storeToRefs(store);
  const { $app } = useNuxtApp();

  async function fetchCart() {
    if (!cartId.value) return;
    const result = await $app.cart.fetchCart(cartId.value);
    if (result instanceof AppSuccess) {
      cart.value = result.data;
    } else if (result instanceof AppBaseError) {
      cartId.value = null;
      cart.value = null;
    }
  }

  async function addItem(req: CreateCartItemRequest) {
    loading.value = true;
    try {
      const result = await $app.cart.addItem(cartId.value, req);
      if (result instanceof AppSuccess) {
        cartId.value = result.data.cartId;
        cart.value = result.data.cart;
      }
      return result;
    } finally {
      loading.value = false;
    }
  }

  async function updateItem(itemId: number, quantity: number) {
    if (!cartId.value) return;
    loading.value = true;
    try {
      const result = await $app.cart.updateItem(cartId.value, itemId, quantity);
      if (result instanceof AppSuccess) {
        cart.value = result.data;
      }
      return result;
    } finally {
      loading.value = false;
    }
  }

  async function removeItem(itemId: number) {
    if (!cartId.value) return;
    loading.value = true;
    try {
      const result = await $app.cart.removeItem(cartId.value, itemId);
      if (result instanceof AppSuccess) {
        cart.value = result.data;
      }
      return result;
    } finally {
      loading.value = false;
    }
  }

  async function clearCart() {
    if (!cartId.value) return;
    loading.value = true;
    try {
      const result = await $app.cart.clearCart(cartId.value);
      if (result instanceof AppSuccess) {
        cart.value = { id: cartId.value, items: [], total: 0 };
      }
      return result;
    } finally {
      loading.value = false;
    }
  }

  return {
    cartId,
    cart,
    items,
    loading,
    totalCount,
    totalPrice,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };
}
