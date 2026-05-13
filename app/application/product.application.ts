import type { ProductService } from '~/service/product.service';
import type { AppSuccess } from '~/types/app';
import type { AppError } from '~/types/app-errors';
import type { Product, ProductQuery } from '~/types/product';

export class ProductApplication {
  private readonly productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async getAll(params?: ProductQuery): Promise<AppSuccess<Product[]> | AppError> {
    return this.productService.getAll(params);
  }
}
