import { API_URL } from '~/constants';
import type { HTTPClient } from '~/lib/http.client';
import type { Product, ProductDetail, ProductQuery } from '~/types/product';

export class ProductService {
  constructor(private readonly httpClient: HTTPClient) {}

  getAll(params?: ProductQuery) {
    return this.httpClient.do<Product[]>(API_URL.products, { params });
  }

  getById(id: number) {
    return this.httpClient.do<ProductDetail>(API_URL.product(id));
  }
}
