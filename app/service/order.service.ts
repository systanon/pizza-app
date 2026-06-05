import { API_URL } from '~/constants';
import type { HTTPClient } from '~/lib/http.client';
import type { Order, CreateOrderRequest } from '~/types/order';

export class OrderService {
  constructor(private readonly httpClient: HTTPClient) {}

  createOrder(req: CreateOrderRequest) {
    return this.httpClient.do<Order>(API_URL.orders, {
      method: 'POST',
      body: req,
    });
  }

  getOrder(orderId: number) {
    return this.httpClient.do<Order>(API_URL.order(orderId));
  }

  createCheckoutSession(orderId: number) {
    return this.httpClient.do<{ checkout_url: string }>(API_URL.orderCheckout(orderId), {
      method: 'POST',
    });
  }
}
