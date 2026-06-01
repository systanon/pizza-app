import type { ProductService } from '~/service/product.service';
import type { ProductQuery } from '~/types/product';

export class ProductApplication {
  constructor(private readonly productService: ProductService) {}

  getAll(params?: ProductQuery) {
    return this.productService.getAll(params);
  }

  getById(id: number) {
    return this.productService.getById(id);
  }
}
