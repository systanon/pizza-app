export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export type OrderAddon = {
  id: number;
  name: string;
  /** Price in cents */
  price: number;
};

export type OrderItem = {
  id: number;
  product_id: number;
  product_name: string;
  variant_id?: number;
  variant_name?: string;
  /** Price in cents */
  variant_price: number;
  quantity: number;
  /** Total for this line (variant_price + addons) * quantity, in cents */
  item_total: number;
  addons: OrderAddon[];
};

export type Order = {
  id: number;
  cart_id: string;
  email: string;
  status: OrderStatus;
  /** Total in cents, calculated server-side */
  total: number;
  items: OrderItem[];
};

export type CreateOrderRequest = {
  cart_id: string;
  email: string;
};
