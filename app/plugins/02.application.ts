import { ProductService } from '~/service/product.service';
import { ProductApplication } from '~/application/product.application';
import { CategoryService } from '~/service/category.service';
import { CategoryApplication } from '~/application/category.application';
import { CartService } from '~/service/cart.service';
import { CartApplication } from '~/application/cart.application';

type AppProvide = {
  provide: {
    app: {
      product: ProductApplication;
      category: CategoryApplication;
      cart: CartApplication;
    };
  };
};

export default defineNuxtPlugin({
  name: 'application',
  setup(): AppProvide {
    const { $httpClient } = useNuxtApp();

    const productService = new ProductService($httpClient);
    const productApplication = new ProductApplication(productService);

    const categoryService = new CategoryService($httpClient);
    const categoryApplication = new CategoryApplication(categoryService);

    const cartService = new CartService($httpClient);
    const cartApplication = new CartApplication(cartService);

    return {
      provide: {
        app: {
          product: productApplication,
          category: categoryApplication,
          cart: cartApplication,
        },
      },
    };
  },
});
