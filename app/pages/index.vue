<template>
  <div>
    <h1>Pizza App</h1>
    <p>Welcome to the Pizza App!</p>
  </div>
</template>
<script lang="ts" setup>
  import { useCategories } from '~/composables/useCategories';
  import { AppSuccess } from '~/types/app';
  import type { Product } from '~/types/product';
  const { data: categories } = useCategories();
  const {
    $app: { product },
  } = useNuxtApp();

  const { data } = await useAsyncData('products', async () => {
    const response = await product.getAll();
    if (response instanceof AppSuccess) {
      return {
        items: response.data as Product[],
        total: Number(response.headers.get('x-total-count') ?? 0),
        offset: Number(response.headers.get('x-total-pages') ?? 1),
      };
    }
    throw response;
  });

  const products = computed(() => data.value?.items ?? []);
  const total = computed(() => data.value?.total ?? 0);
  const offset = computed(() => data.value?.offset ?? 0);
</script>
