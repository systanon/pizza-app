import { API_URL } from '~/constants';
import type { HTTPClient } from '~/lib/http.client';
import { AppSuccess } from '~/types/app';
import { AppError } from '~/types/app-errors';
import type { Product, ProductQuery } from '~/types/product';

export class ProductService {
  private readonly httpClient: HTTPClient;

  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getAll(params?: ProductQuery): Promise<AppSuccess<Product[]> | AppError> {
    const url = API_URL.products;
    return this.httpClient.do<Product[]>(url, { params });
  }
}
