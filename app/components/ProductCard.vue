<template>
  <v-card :to="`/products/${product.id}`">
    <v-img :src="product.image_url" :alt="product.name" height="220" cover>
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </template>
      <template #error>
        <div class="d-flex align-center justify-center fill-height bg-surface-variant">
          <v-icon icon="mdi-image-off-outline" size="48" color="medium-emphasis" />
        </div>
      </template>
    </v-img>

    <v-card-title class="text-body-1 font-weight-medium pt-3">
      {{ product.name }}
    </v-card-title>

    <v-card-text v-if="product.description" class="text-body-2 text-medium-emphasis pt-0">
      {{ product.description }}
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" variant="tonal" :to="`/products/${product.id}`">
        Order Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import type { Product } from '~/types/product';

  defineProps<{
    product: Product;
  }>();
</script>
