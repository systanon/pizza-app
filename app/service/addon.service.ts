import { API_URL } from '~/constants';
import type { HTTPClient } from '~/lib/http.client';
import type { Addon } from '~/types/addon';

export class AddonService {
  constructor(private readonly httpClient: HTTPClient) {}

  getByCategoryId(categoryId: number) {
    return this.httpClient.do<Addon[]>(API_URL.categoryAddons(categoryId));
  }
}
