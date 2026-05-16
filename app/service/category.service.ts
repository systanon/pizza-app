import type { HTTPClient } from '~/lib/http.client';
import type { Category } from '~/types/category';

export class CategoryService {
  constructor(private httpClient: HTTPClient) {}

  async getCategories() {
    return this.httpClient.do<Category[]>('/categories');
  }
}
