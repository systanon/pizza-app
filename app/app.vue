<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
  import { AppSuccess } from './types/app';

  const { $app } = useNuxtApp();

  const { data: categories } = await useAsyncData('categories', async () => {
    const response = await $app.category.getCategories();

    if (response instanceof AppSuccess) {
      return response.data;
    }
    throw response;
  });
</script>
