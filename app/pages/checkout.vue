<template>
  <v-container class="py-8" style="max-width: 560px">
    <v-btn to="/" variant="text" prepend-icon="mdi-arrow-left" class="mb-4 px-0">
      Back to menu
    </v-btn>

    <h1 class="text-h5 font-weight-medium mb-6">Checkout</h1>

    <v-card v-if="!items.length" variant="outlined" class="py-12 text-center">
      <v-icon icon="mdi-cart-off" size="48" color="medium-emphasis" />
      <p class="text-body-1 text-medium-emphasis mt-3">Your cart is empty</p>
      <v-btn to="/" variant="tonal" class="mt-4">Browse menu</v-btn>
    </v-card>

    <template v-else>
      <v-card variant="outlined" class="mb-4">
        <v-card-text>
          <p class="text-body-2 font-weight-medium text-medium-emphasis mb-3">ORDER SUMMARY</p>
          <div
            v-for="item in items"
            :key="item.id"
            class="d-flex justify-space-between align-start mb-2"
          >
            <div>
              <span class="text-body-2">{{ item.product_name }}</span>
              <span v-if="item.variant_name" class="text-caption text-medium-emphasis ml-1">
                · {{ item.variant_name }}
              </span>
              <span class="text-caption text-medium-emphasis ml-1">× {{ item.quantity }}</span>
              <div v-if="item.addons.length" class="text-caption text-medium-emphasis">
                + {{ item.addons.map((a) => a.name).join(', ') }}
              </div>
            </div>
            <!-- NOTE: item price is calculated client-side as (variant_price + addons) * quantity.
                 This is intentional — CartItem does not carry item_total because cart prices
                 are always live (joined from product_variant_prices at query time on the backend).
                 The backend returns cart.total as the authoritative sum for the whole cart. -->
            <span v-if="item.variant_price != null" class="text-body-2 ml-4 text-no-wrap">
              {{
                fmt(
                  (item.variant_price + item.addons.reduce((s, a) => s + a.price, 0)) *
                    item.quantity,
                )
              }}
            </span>
          </div>

          <v-divider class="my-3" />

          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span class="text-medium-emphasis">Subtotal</span>
            <span>{{ fmt(totalPrice) }}</span>
          </div>
          <div class="d-flex justify-space-between text-body-2 mb-3">
            <span class="text-medium-emphasis">Delivery</span>
            <span :class="deliveryFee === 0 ? 'text-success' : ''">
              {{ deliveryFee === 0 ? 'Free' : fmt(deliveryFee) }}
            </span>
          </div>
          <div class="d-flex justify-space-between text-body-1 font-weight-bold">
            <span>Total</span>
            <span>{{ fmt(grandTotal) }}</span>
          </div>
        </v-card-text>
      </v-card>

      <v-card variant="outlined">
        <v-card-text>
          <p class="text-body-2 font-weight-medium text-medium-emphasis mb-3">CONTACT</p>
          <v-form ref="formRef" @submit.prevent="submit">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              placeholder="your@email.com"
              variant="outlined"
              density="comfortable"
              :rules="emailRules"
              :disabled="loading"
              class="mb-2"
            />

            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              class="mb-3"
              density="compact"
            >
              {{ errorMessage }}
            </v-alert>

            <v-btn type="submit" block color="primary" size="large" :loading="loading">
              <v-icon start icon="mdi-lock-outline" />
              Pay {{ fmt(grandTotal) }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script setup lang="ts">
  import { AppSuccess } from '~/types/app';

  const { items, totalPrice, deliveryFee, grandTotal, cartId } = useCart();
  const { fmt } = useCurrency();
  const { $app } = useNuxtApp();

  const formRef = ref();
  const email = ref('');
  const loading = ref(false);
  const errorMessage = ref('');

  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email',
  ];

  async function submit() {
    const { valid } = await formRef.value.validate();
    if (!valid || !cartId.value) return;

    loading.value = true;
    errorMessage.value = '';

    try {
      const result = await $app.order.placeOrder(cartId.value, email.value);
      if (result instanceof AppSuccess) {
        // Redirect to Stripe Checkout
        window.location.href = result.data.checkoutUrl;
      } else {
        errorMessage.value = result.message || 'Something went wrong. Please try again.';
      }
    } finally {
      loading.value = false;
    }
  }
</script>
