<template>
  <v-container class="py-8" max-width="800">
    <v-alert v-if="productError" type="error" variant="tonal" class="mb-6">
      Product not found.
      <v-btn variant="text" to="/" size="small" class="ml-2">Back to menu</v-btn>
    </v-alert>

    <template v-else-if="product">
      <v-btn
        variant="text"
        prepend-icon="mdi-arrow-left"
        to="/"
        size="small"
        class="mb-4 text-none"
      >
        Back to menu
      </v-btn>

      <v-row>
        <v-col cols="12" md="5">
          <v-img :src="product.image_url" :alt="product.name" rounded="lg" height="320" cover>
            <template #error>
              <div
                class="d-flex align-center justify-center fill-height bg-surface-variant rounded-lg"
              >
                <v-icon icon="mdi-image-off-outline" size="64" color="medium-emphasis" />
              </div>
            </template>
          </v-img>
        </v-col>

        <v-col cols="12" md="7">
          <h1 class="text-h5 font-weight-semibold mb-2">{{ product.name }}</h1>
          <p v-if="product.description" class="text-body-2 text-medium-emphasis mb-6">
            {{ product.description }}
          </p>

          <template v-if="hasVariants">
            <p class="text-body-2 font-weight-medium mb-2">
              Size
              <span class="text-caption text-error ml-1">*required</span>
            </p>
            <v-btn-toggle
              v-model="selectedVariant"
              mandatory
              color="primary"
              variant="outlined"
              divided
              class="mb-6 d-flex flex-wrap gap-2"
              style="overflow: visible; height: auto"
            >
              <v-btn
                v-for="variant in product.variants"
                :key="variant.id"
                :value="variant"
                size="small"
              >
                {{ variant.name }}
                <span class="text-caption ml-1 text-medium-emphasis"
                  >{{ variant.value }}{{ variant.unit }}</span
                >
                <span class="ml-2">{{ fmt(variant.price) }}</span>
              </v-btn>
            </v-btn-toggle>
          </template>

          <template v-if="addons?.length">
            <p class="text-body-2 font-weight-medium mb-2">Add-ons</p>
            <div class="d-flex flex-column gap-1 mb-6">
              <v-checkbox
                v-for="addon in addons"
                :key="addon.id"
                v-model="selectedAddonIds"
                :label="`${addon.name}  +${fmt(addon.price)}`"
                :value="addon.id"
                density="compact"
                hide-details
              />
            </div>
          </template>

          <p class="text-body-2 font-weight-medium mb-2">Quantity</p>
          <div class="d-flex align-center gap-3 mb-6">
            <v-btn
              icon="mdi-minus"
              size="small"
              variant="outlined"
              :disabled="quantity <= 1"
              @click="quantity--"
            />
            <span class="text-body-1 font-weight-medium">{{ quantity }}</span>
            <v-btn icon="mdi-plus" size="small" variant="outlined" @click="quantity++" />
          </div>

          <v-divider class="mb-4" />
          <div class="d-flex align-center justify-space-between mb-4">
            <span class="text-body-2 text-medium-emphasis">Total</span>
            <span class="text-h6 font-weight-semibold">
              {{ lineTotal > 0 ? fmt(lineTotal) : '—' }}
            </span>
          </div>

          <v-alert v-if="cartError" type="error" variant="tonal" density="compact" class="mb-4">
            {{ cartError }}
          </v-alert>

          <v-btn
            block
            color="primary"
            size="large"
            :disabled="!canAddToCart || cartLoading"
            :loading="cartLoading"
            @click="handleAddToCart"
          >
            <v-icon start icon="mdi-cart-plus" />
            Add to cart
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
  import { AppSuccess } from '~/types/app';
  import { AppError } from '~/types/app-errors';
  import type { Variant } from '~/types/product';
  import type { Addon } from '~/types/addon';

  const route = useRoute();
  const productId = computed(() => Number(route.params.id));

  const {
    $app: { product: productApp, addon: addonApp },
  } = useNuxtApp();

  const { addItem, loading: cartLoading } = useCart();

  const { fmt } = useCurrency();

  const { data: product, error: productError } = await useAsyncData(
    `product-${productId.value}`,
    async () => {
      const result = await productApp.getById(productId.value);
      if (result instanceof AppSuccess) return result.data;
      throw result;
    },
  );

  const { data: addons } = await useAsyncData(`addons-${product.value?.category_id}`, async () => {
    if (!product.value?.category_id) return [] as Addon[];
    const result = await addonApp.getByCategoryId(product.value.category_id);
    if (result instanceof AppSuccess) return result.data;
    return [] as Addon[];
  });

  const hasVariants = computed(() => !!product.value?.variants?.length);

  const selectedVariant = ref<Variant | null>(product.value?.variants?.[0] ?? null);
  const selectedAddonIds = ref<number[]>([]);
  const quantity = ref(1);
  const cartError = ref<string | null>(null);

  const selectedAddons = computed(() =>
    (addons.value ?? []).filter((a) => selectedAddonIds.value.includes(a.id)),
  );

  const lineTotal = computed(() => {
    const variantPrice = selectedVariant.value?.price ?? 0;
    const addonsPrice = selectedAddons.value.reduce((s, a) => s + a.price, 0);
    return (variantPrice + addonsPrice) * quantity.value;
  });

  const canAddToCart = computed(() => !hasVariants.value || selectedVariant.value !== null);

  async function handleAddToCart() {
    if (!canAddToCart.value) return;
    cartError.value = null;

    const result = await addItem({
      product_id: productId.value,
      variant_id: selectedVariant.value?.id ?? undefined,
      quantity: quantity.value,
      addon_ids: selectedAddonIds.value.length ? selectedAddonIds.value : undefined,
    });

    if (result instanceof AppError) {
      cartError.value = result.message;
      return;
    }

    navigateTo('/cart');
  }
</script>
