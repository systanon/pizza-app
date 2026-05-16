import type { Category } from '~/types/category';

export function useCategories() {
  return useNuxtData<Category[]>('categories');
}
