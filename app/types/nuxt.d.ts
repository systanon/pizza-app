import type { ProductApplication } from '~/application/product.application';
import type { HTTPClient } from '~/lib/http.client';

declare module '#app' {
  interface NuxtApp {
    $httpClient: HTTPClient;
    $app: {
      product: ProductApplication;
      category: CategoryApplication;
    };
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $httpClient: HTTPClient;
    $app: {
      product: ProductApplication;
      category: CategoryApplication;
    };
  }
}

export {};
