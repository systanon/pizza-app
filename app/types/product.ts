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
  name: string;
  description: string;
  price: number;
  category_id: number;
  imageUrl: string;
  created_at: string;
};
