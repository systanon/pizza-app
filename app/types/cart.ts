export type CartAddon = {
  id: number;
  name: string;
  /** Price in cents */
  price: number;
};

export type CartItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  variant_id?: number;
  variant_name?: string;
  variant_unit?: string;
  /** Price in cents */
  variant_price?: number;
  quantity: number;
  addons: CartAddon[];
};

export type Cart = {
  id: string;
  items: CartItem[];
  /** Total price in cents, calculated server-side */
  total: number;
};

export type CreateCartItemRequest = {
  product_id: number;
  variant_id?: number;
  quantity: number;
  addon_ids?: number[];
};

export type UpdateCartItemRequest = {
  quantity: number;
};
