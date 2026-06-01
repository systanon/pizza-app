import type { AddonService } from '~/service/addon.service';

export class AddonApplication {
  constructor(private readonly addonService: AddonService) {}

  getByCategoryId(categoryId: number) {
    return this.addonService.getByCategoryId(categoryId);
  }
}
