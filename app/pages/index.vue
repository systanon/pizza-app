<template>
  <v-container>
    <Filters v-model:categoryId="categoryId" v-model:q="q" @reset-filters="resetFilters" />
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <ProductCard :product="product" @add-product="addProduct" />
      </v-col>
    </v-row>
    <v-empty-state
      v-if="!products.length"
      icon="mdi-pizza-off"
      title="Nothing found"
      text="Try changing the filters or search query."
    />

    <div class="d-flex justify-center mt-6">
      <v-pagination
        v-if="pagination.pages > 1"
        :model-value="pagination.page"
        :length="pagination.pages"
        :total-visible="7"
        @update:model-value="btnPage($event)"
      />
    </div>
  </v-container>
</template>
<script lang="ts" setup>
  import { useCartStore } from '~/store/cart';
  import { AppSuccess } from '~/types/app';
  import type { Product } from '~/types/product';

  const {
    $app: { product },
  } = useNuxtApp();

  const {
    requestFiltersParams,
    saveQuery,
    setPages,
    resetFilters,
    q,
    categoryId,
    pagination,
    btnPage,
  } = useFilters(550);

  const { data } = await useAsyncData(
    'products',
    async () => {
      const response = await product.getAll(requestFiltersParams.value);
      if (response instanceof AppSuccess) {
        return {
          items: response.data as Product[],
          total: Number(response.headers.get('x-total-count') ?? 0),
          totalPages: Number(response.headers.get('x-total-pages') ?? 1),
        };
      }
      return null;
    },
    { watch: [requestFiltersParams] },
  );
  const products = computed(() => data.value?.items ?? []);
  const total = computed(() => data.value?.total ?? 0);
  const totalPages = computed(() => data.value?.totalPages ?? 0);

  const addProduct = (product: Product) => {
    const cartStore = useCartStore();
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
  };

  watch(
    requestFiltersParams,
    () => {
      saveQuery();
    },
    { deep: true },
  );

  watch(totalPages, (pages) => setPages(pages), { immediate: true });
</script>
