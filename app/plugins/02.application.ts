import { ProductService } from '~/service/product.service';
import { ProductApplication } from '~/application/product.application';
import { CategoryService } from '~/service/category.service';
import { CategoryApplication } from '~/application/category.application';
import { CartService } from '~/service/cart.service';
import { CartApplication } from '~/application/cart.application';
import { AddonService } from '~/service/addon.service';
import { AddonApplication } from '~/application/addon.application';
import { OrderApplication } from '~/application/order.application';
import { OrderService } from '~/service/order.service';

type AppProvide = {
  provide: {
    app: {
      product: ProductApplication;
      category: CategoryApplication;
      cart: CartApplication;
      addon: AddonApplication;
      order: OrderApplication;
    };
  };
};

export default defineNuxtPlugin({
  name: 'application',
  setup(): AppProvide {
    const { $httpClient } = useNuxtApp();

    const productApplication = new ProductApplication(new ProductService($httpClient));
    const categoryApplication = new CategoryApplication(new CategoryService($httpClient));
    const cartApplication = new CartApplication(new CartService($httpClient));
    const addonApplication = new AddonApplication(new AddonService($httpClient));
    const orderApplication = new OrderApplication(new OrderService($httpClient));

    return {
      provide: {
        app: {
          product: productApplication,
          category: categoryApplication,
          cart: cartApplication,
          addon: addonApplication,
          order: orderApplication,
        },
      },
    };
  },
});
