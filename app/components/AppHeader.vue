<template>
  <v-app-bar flat border="b">
    <v-app-bar-title>
      <nuxt-link to="/" class="d-flex align-center gap-2 text-decoration-none">
        <span style="font-size: 22px">🍕</span>
        <span class="text-body-1 font-weight-medium">
          Pizza<span class="text-error">Hub</span>
        </span>
      </nuxt-link>
    </v-app-bar-title>

    <!-- Nav -->
    <v-btn variant="text" size="small" to="/" exact>Menu</v-btn>
    <v-btn variant="text" size="small" to="/deals">Deals</v-btn>
    <v-btn variant="text" size="small" to="/track">Track order</v-btn>

    <v-spacer />

    <v-btn
      variant="outlined"
      size="small"
      prepend-icon="mdi-map-marker-outline"
      append-icon="mdi-chevron-down"
      class="mr-2 text-none"
    >
      {{ address }}
    </v-btn>

    <v-btn icon variant="text" size="small" to="/cart">
      <v-badge :content="totalCount" :model-value="totalCount > 0" color="error">
        <v-icon icon="mdi-cart-outline" />
      </v-badge>
    </v-btn>

    <v-avatar
      size="32"
      color="surface-variant"
      class="ml-2 cursor-pointer"
      @click="navigateTo('/profile')"
    >
      <span class="text-caption font-weight-medium">JD</span>
    </v-avatar>
  </v-app-bar>
</template>

<script setup lang="ts">
  const { totalCount } = useCart();

  const address = ref('123 Main St');
</script>
