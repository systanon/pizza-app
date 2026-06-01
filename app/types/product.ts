export type ProductQuery = {
  categoryId?: number;
  q?: string;
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
  page?: number;
  perPage?: number;
};

export type Product = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  image_url: string;
};

export type Variant = {
  id: number;
  name: string;
  unit: string;
  /** Price in cents */
  price: number;
  value: number;
};

export type ProductDetail = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  image_url: string;
  variants?: Variant[];
};
