<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import { AppSuccess } from './types/app';

  const { $app } = useNuxtApp();
  const { fetchCart } = useCart();

  await Promise.all([
    useAsyncData('categories', async () => {
      const response = await $app.category.getCategories();
      if (response instanceof AppSuccess) return response.data;
      return [];
    }),
    useAsyncData('cart', fetchCart),
  ]);
</script>
