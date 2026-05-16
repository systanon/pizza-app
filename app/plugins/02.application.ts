import { ProductService } from '~/service/product.service';
import { ProductApplication } from '~/application/product.application';

type ApiProvide = {
  provide: {
    api: {
      product: ProductApplication;
    };
  };
};
export default defineNuxtPlugin({
  name: 'application',
  setup(): ApiProvide {
    const { $httpClient } = useNuxtApp();

    const productService = new ProductService($httpClient);
    const productApplication = new ProductApplication(productService);

    return {
      provide: {
        api: {
          product: productApplication,
        },
      },
    };
  },
});
