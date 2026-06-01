import type { CartService } from '~/service/cart.service';
import { AppSuccess } from '~/types/app';
import type { AppBaseError } from '~/types/app-errors';
import type { Cart, CreateCartItemRequest } from '~/types/cart';

export class CartApplication {
  constructor(private readonly cartService: CartService) {}

  fetchCart(cartId: string) {
    return this.cartService.getCart(cartId);
  }

  async addItem(
    cartId: string | null,
    req: CreateCartItemRequest,
  ): Promise<AppSuccess<{ cartId: string; cart: Cart }> | AppBaseError> {
    let id = cartId;

    if (!id) {
      const createResult = await this.cartService.createCart();
      if (!(createResult instanceof AppSuccess)) return createResult;
      id = createResult.data.id;
    }

    const addResult = await this.cartService.addItem(id, req);
    if (!(addResult instanceof AppSuccess)) return addResult;

    return new AppSuccess({ cartId: id, cart: addResult.data }, addResult.headers);
  }

  updateItem(cartId: string, itemId: number, quantity: number) {
    return this.cartService.updateItem(cartId, itemId, { quantity });
  }

  removeItem(cartId: string, itemId: number) {
    return this.cartService.removeItem(cartId, itemId);
  }

  clearCart(cartId: string) {
    return this.cartService.clearCart(cartId);
  }
}
