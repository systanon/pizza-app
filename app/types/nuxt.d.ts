import type { ProductApplication } from '~/application/product.application';
import type { CategoryApplication } from '~/application/category.application';
import type { CartApplication } from '~/application/cart.application';
import type { HTTPClient } from '~/lib/http.client';

declare module '#app' {
  interface NuxtApp {
    $httpClient: HTTPClient;
    $app: {
      product: ProductApplication;
      category: CategoryApplication;
      cart: CartApplication;
    };
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $httpClient: HTTPClient;
    $app: {
      product: ProductApplication;
      category: CategoryApplication;
      cart: CartApplication;
    };
  }
}

export {};
