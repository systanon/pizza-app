import { ProductService } from '~/service/product.service';
import { ProductApplication } from '~/application/product.application';
import { CategoryService } from '~/service/category.service';
import { CategoryApplication } from '~/application/category.application';

type ApiProvide = {
  provide: {
    app: {
      product: ProductApplication;
      category: CategoryApplication;
    };
  };
};
export default defineNuxtPlugin({
  name: 'application',
  setup(): ApiProvide {
    const { $httpClient } = useNuxtApp();

    const productService = new ProductService($httpClient);
    const productApplication = new ProductApplication(productService);
    const categoryService = new CategoryService($httpClient);

    const categotyApplication = new CategoryApplication(categoryService);

    return {
      provide: {
        app: {
          product: productApplication,
          category: categotyApplication,
        },
      },
    };
  },
});
