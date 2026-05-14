import type { ProductApplication } from '~/application/product.application';
import type { HTTPClient } from '~/lib/http.client';

declare module '#app' {
  interface NuxtApp {
    $httpClient: HTTPClient;
    $api: {
      product: ProductApplication;
    };
  }
}

export {};
