<script setup lang="ts">
  const { items, totalCount, totalPrice, loading, fetchCart, updateItem, removeItem, clearCart } =
    useCart();

  await useAsyncData('cart', fetchCart);

  function fmt(cents: number) {
    return '$' + (cents / 100).toFixed(2);
  }

  const deliveryFee = computed(() => (totalPrice.value >= 2000 ? 0 : 299));
  const grandTotal = computed(() => totalPrice.value + deliveryFee.value);
</script>

<template>
  <v-container class="py-8">
    <h1 class="text-h5 font-weight-medium mb-1">Your order</h1>
    <p class="text-body-2 text-medium-emphasis mb-6">
      {{ totalCount }} {{ totalCount > 1 ? 'items' : 'item' }}
    </p>

    <v-row>
      <v-col cols="12" md="8">
        <template v-if="items.length">
          <v-card v-for="item in items" :key="item.id" variant="outlined" class="mb-3">
            <v-card-text>
              <div class="d-flex align-center gap-4">
                <v-avatar size="56" rounded="lg" color="surface-variant">
                  <v-img
                    v-if="item.product_image"
                    :src="item.product_image"
                    :alt="item.product_name"
                    cover
                  />
                  <v-icon v-else icon="mdi-image-outline" />
                </v-avatar>
                <div class="flex-grow-1 min-width-0">
                  <p class="text-body-1 font-weight-medium text-truncate">
                    {{ item.product_name }}
                  </p>

                  <p v-if="item.variant_name" class="text-body-2 text-medium-emphasis mb-1">
                    {{ item.variant_name }}
                    <span v-if="item.variant_unit" class="text-caption">
                      · {{ item.variant_unit }}
                    </span>
                  </p>

                  <div v-if="item.addons.length" class="d-flex flex-wrap gap-1 mb-2">
                    <v-chip
                      v-for="addon in item.addons"
                      :key="addon.id"
                      size="x-small"
                      variant="tonal"
                    >
                      {{ addon.name }} +{{ fmt(addon.price) }}
                    </v-chip>
                  </div>

                  <div class="d-flex align-center gap-2">
                    <v-btn
                      icon="mdi-minus"
                      size="x-small"
                      variant="outlined"
                      :disabled="loading"
                      @click="updateItem(item.id, item.quantity - 1)"
                    />
                    <span class="text-body-2 font-weight-medium">{{ item.quantity }}</span>
                    <v-btn
                      icon="mdi-plus"
                      size="x-small"
                      variant="outlined"
                      :disabled="loading"
                      @click="updateItem(item.id, item.quantity + 1)"
                    />
                  </div>
                </div>

                <div class="d-flex flex-column align-end gap-2">
                  <span v-if="item.variant_price != null" class="text-body-1 font-weight-medium">
                    {{
                      fmt(
                        (item.variant_price + item.addons.reduce((s, a) => s + a.price, 0)) *
                          item.quantity,
                      )
                    }}
                  </span>
                  <v-btn
                    icon="mdi-delete-outline"
                    size="small"
                    variant="text"
                    color="error"
                    :disabled="loading"
                    @click="removeItem(item.id)"
                  />
                </div>
              </div>
            </v-card-text>
          </v-card>

          <div class="d-flex justify-end mt-2">
            <v-btn
              variant="text"
              color="error"
              size="small"
              prepend-icon="mdi-trash-can-outline"
              :disabled="loading"
              @click="clearCart()"
            >
              Clear cart
            </v-btn>
          </div>
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
              <span>{{ fmt(totalPrice) }}</span>
            </div>
            <div class="d-flex justify-space-between text-body-2 mb-2">
              <span class="text-medium-emphasis">Delivery fee</span>
              <span :class="deliveryFee === 0 ? 'text-success' : ''">
                {{ deliveryFee === 0 ? 'Free' : fmt(deliveryFee) }}
              </span>
            </div>

            <v-divider class="my-3" />

            <div class="d-flex justify-space-between text-body-1 font-weight-medium mb-4">
              <span>Total</span>
              <span>{{ fmt(grandTotal) }}</span>
            </div>

            <v-btn
              block
              color="primary"
              size="large"
              :disabled="!items.length || loading"
              to="/checkout"
            >
              <v-icon start icon="mdi-lock-outline" />
              Place order
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
