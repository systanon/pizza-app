<script setup lang="ts">
  import { useCartStore } from '~/store/cart';
  import { storeToRefs } from 'pinia';

  export type PizzaSize = 'Small 10"' | 'Medium 12"' | 'Large 14"';

  const store = useCartStore();
  const { items, totalCount } = storeToRefs(store);

  const promoCode = ref('');
  const promoDiscount = ref(0);
  const promoError = ref(false);
  const promoApplied = ref(false);
  const promoLabel = ref('');

  const PROMOS: Record<string, number> = {
    PIZZA10: 0.1,
    FIRSTORDER: 0.15,
  };

  const subtotal = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0));
  const savings = computed(() => Math.round(subtotal.value * promoDiscount.value * 100) / 100);
  const deliveryFee = computed(() => (subtotal.value >= 20 ? 0 : 2.99));
  const total = computed(() => subtotal.value - savings.value + deliveryFee.value);

  function fmt(n: number) {
    return '$' + n.toFixed(2);
  }

  function applyPromo() {
    const code = promoCode.value.trim().toUpperCase();
    if (PROMOS[code]) {
      promoDiscount.value = PROMOS[code];
      promoApplied.value = true;
      promoError.value = false;
      promoLabel.value = `${code} applied — ${PROMOS[code] * 100}% off`;
    } else {
      promoDiscount.value = 0;
      promoApplied.value = false;
      promoError.value = true;
      promoLabel.value = '';
    }
  }
</script>

<template>
  <v-container class="py-8">
    <h1 class="text-h5 font-weight-medium mb-1">Your order</h1>
    <p class="text-body-2 text-medium-emphasis mb-6">
      {{ totalCount }} {{ totalCount === 1 ? 'item' : 'items' }}
    </p>

    <v-row>
      <v-col cols="12" md="8">
        <template v-if="items.length">
          <v-card v-for="item in items" :key="item.id" variant="outlined" class="mb-3">
            <v-card-text>
              <div class="d-flex align-center gap-4">
                <v-avatar size="56" rounded="lg" color="surface-variant">
                  <v-img v-if="item.image_url" :src="item.image_url" :alt="item.name" cover />
                  <v-icon v-else icon="mdi-image-outline" />
                </v-avatar>

                <div class="flex-grow-1 min-width-0">
                  <p class="text-body-1 font-weight-medium text-truncate">
                    {{ item.name }}
                  </p>
                  <p class="text-body-2 text-medium-emphasis mb-1">
                    {{ item.variant }}
                  </p>
                  <v-chip size="x-small" variant="outlined" class="mb-2">
                    {{ item.size }}
                  </v-chip>

                  <div class="d-flex align-center gap-2">
                    <v-btn
                      icon="mdi-minus"
                      size="x-small"
                      variant="outlined"
                      @click="store.updateQuantity(item.id, item.quantity - 1)"
                    />
                    <span class="text-body-2 font-weight-medium">{{ item.quantity }}</span>
                    <v-btn
                      icon="mdi-plus"
                      size="x-small"
                      variant="outlined"
                      @click="store.updateQuantity(item.id, item.quantity + 1)"
                    />
                  </div>
                </div>

                <div class="d-flex flex-column align-end gap-2">
                  <span class="text-body-1 font-weight-medium">
                    {{ fmt(item.price * item.quantity) }}
                  </span>
                  <v-btn
                    icon="mdi-delete-outline"
                    size="small"
                    variant="text"
                    color="error"
                    @click="store.removeItem(item.id)"
                  />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </template>

        <v-card v-else variant="outlined" class="py-12 text-center">
          <v-icon icon="mdi-pizza" size="48" color="medium-emphasis" />
          <p class="text-body-1 text-medium-emphasis mt-3">No products yet</p>
          <v-btn to="/" variant="tonal" class="mt-4">Browse menu</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card variant="outlined">
          <v-card-text>
            <p class="text-body-1 font-weight-medium mb-4">Order summary</p>

            <v-sheet
              color="surface-variant"
              rounded="lg"
              class="d-flex align-center gap-2 pa-3 mb-4"
            >
              <v-icon icon="mdi-clock-outline" size="18" />
              <span class="text-body-2">
                Estimated delivery:
                <strong>25–35 min</strong>
              </span>
            </v-sheet>

            <div class="d-flex justify-space-between text-body-2 mb-2">
              <span class="text-medium-emphasis">Items ({{ totalCount }})</span>
              <span>{{ fmt(subtotal) }}</span>
            </div>
            <div class="d-flex justify-space-between text-body-2 mb-2">
              <span class="text-medium-emphasis">Delivery fee</span>
              <span :class="deliveryFee === 0 ? 'text-success' : ''">
                {{ deliveryFee === 0 ? 'Free' : fmt(deliveryFee) }}
              </span>
            </div>
            <div v-if="savings > 0" class="d-flex justify-space-between text-body-2 mb-2">
              <span class="text-medium-emphasis">Promo discount</span>
              <span class="text-success">–{{ fmt(savings) }}</span>
            </div>

            <v-divider class="my-3" />

            <div class="d-flex justify-space-between text-body-1 font-weight-medium mb-4">
              <span>Total</span>
              <span>{{ fmt(total) }}</span>
            </div>

            <div class="d-flex gap-2 mb-2">
              <v-text-field
                v-model="promoCode"
                placeholder="Promo code"
                density="compact"
                variant="outlined"
                :error="promoError"
                hide-details
                @keyup.enter="applyPromo"
              />
              <v-btn variant="outlined" @click="applyPromo">Apply</v-btn>
            </div>

            <v-alert
              v-if="promoApplied"
              type="success"
              density="compact"
              variant="tonal"
              class="mb-4"
            >
              {{ promoLabel }}
            </v-alert>
            <v-alert v-if="promoError" type="error" density="compact" variant="tonal" class="mb-4">
              Invalid promo code
            </v-alert>

            <v-btn block color="primary" size="large" :disabled="!items.length" to="/checkout">
              <v-icon start icon="mdi-lock-outline" />
              Place order
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
