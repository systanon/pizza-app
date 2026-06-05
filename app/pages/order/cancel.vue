<template>
  <v-container class="py-16 text-center" style="max-width: 480px">
    <v-icon icon="mdi-close-circle-outline" size="72" color="error" class="mb-4" />

    <h1 class="text-h5 font-weight-medium mb-2">Payment cancelled</h1>
    <p class="text-body-2 text-medium-emphasis mb-6">
      No worries — your cart is still saved. You can try again whenever you're ready.
    </p>

    <div class="d-flex flex-column gap-3">
      <v-btn color="primary" size="large" to="/cart">Back to cart</v-btn>
      <v-btn variant="text" to="/">Browse menu</v-btn>
    </div>
  </v-container>
</template>
