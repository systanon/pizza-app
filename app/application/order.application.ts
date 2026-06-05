import type { OrderService } from '~/service/order.service';
import { AppSuccess } from '~/types/app';
import type { AppBaseError } from '~/types/app-errors';
import type { Order } from '~/types/order';

export class OrderApplication {
  constructor(private readonly orderService: OrderService) {}

  getOrder(orderId: number) {
    return this.orderService.getOrder(orderId);
  }

  /**
   * Creates an order from the given cart and immediately obtains
   * a Stripe Checkout URL. Returns both the order and the redirect URL.
   */
  async placeOrder(
    cartId: string,
    email: string,
  ): Promise<AppSuccess<{ order: Order; checkoutUrl: string }> | AppBaseError> {
    const orderResult = await this.orderService.createOrder({ cart_id: cartId, email });
    if (!(orderResult instanceof AppSuccess)) return orderResult;

    const checkoutResult = await this.orderService.createCheckoutSession(orderResult.data.id);
    if (!(checkoutResult instanceof AppSuccess)) return checkoutResult;

    return new AppSuccess(
      { order: orderResult.data, checkoutUrl: checkoutResult.data.checkout_url },
      checkoutResult.headers,
    );
  }
}
