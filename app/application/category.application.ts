import type { CategoryService } from '~/service/category.service';

export class CategoryApplication {
  constructor(private categoryService: CategoryService) {}

  async getCategories() {
    return this.categoryService.getCategories();
  }
}
