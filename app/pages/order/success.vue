<template>
  <v-container class="py-16 text-center" style="max-width: 480px">
    <v-icon icon="mdi-check-circle-outline" size="72" color="success" class="mb-4" />

    <h1 class="text-h5 font-weight-medium mb-2">Payment successful!</h1>
    <p class="text-body-2 text-medium-emphasis mb-2">
      Thank you for your order. We'll start preparing it right away.
    </p>
    <p v-if="orderId" class="text-caption text-medium-emphasis mb-6">Order #{{ orderId }}</p>

    <div class="d-flex flex-column gap-3">
      <v-btn color="primary" size="large" to="/">Back to menu</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  const { cartId, cart } = useCart();

  // Stripe appends ?session_id=... to the success URL — we use it to show the order id
  // The order_id is stored in Stripe session metadata and retrieved via the backend
  const orderId = ref<number | null>(null);

  onMounted(async () => {
    // Clear cart on successful payment
    cartId.value = null;
    cart.value = null;
  });
</script>
