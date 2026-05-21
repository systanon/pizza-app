<template>
  <v-card>
    <v-img :src="product.image_url" :alt="product.name" height="300" cover>
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </template>

      <template #error>
        <v-img
          class="mx-auto"
          height="300"
          src="https://picsum.photos/500/300?image=232"
          cover
        ></v-img>
      </template>
    </v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="emit('add-product', product)">Order Now</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
  import type { Product } from '~/types/product';
  defineProps<{
    product: Product;
  }>();

  const emit = defineEmits<{
    (e: 'add-product', product: Product): void;
  }>();
</script>
