import { API_URL } from '~/constants';
import type { HTTPClient } from '~/lib/http.client';
import type { Cart, CreateCartItemRequest, UpdateCartItemRequest } from '~/types/cart';

export class CartService {
  constructor(private readonly httpClient: HTTPClient) {}

  createCart() {
    return this.httpClient.do<{ id: string }>(API_URL.cart, { method: 'POST' });
  }

  getCart(cartId: string) {
    return this.httpClient.do<Cart>(`${API_URL.cart}/${cartId}`);
  }

  addItem(cartId: string, req: CreateCartItemRequest) {
    return this.httpClient.do<Cart>(`${API_URL.cart}/${cartId}/items`, {
      method: 'POST',
      body: req,
    });
  }

  updateItem(cartId: string, itemId: number, req: UpdateCartItemRequest) {
    return this.httpClient.do<Cart>(`${API_URL.cart}/${cartId}/items/${itemId}`, {
      method: 'PATCH',
      body: req,
    });
  }

  removeItem(cartId: string, itemId: number) {
    return this.httpClient.do<Cart>(`${API_URL.cart}/${cartId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  clearCart(cartId: string) {
    return this.httpClient.do<null>(`${API_URL.cart}/${cartId}`, { method: 'DELETE' });
  }
}
