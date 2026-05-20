import type { LocationQueryRaw } from 'vue-router';
import z from 'zod';
import { PAGINATION_CONFIG } from '~/constants';

export function useFilters(debounceDelay: number = 550) {
  const route = useRoute();
  const router = useRouter();

  const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = PAGINATION_CONFIG;

  const querySchema = z.object({
    q: z.string().optional(),
    categoryId: z.coerce.number().optional(),
    perPage: z.coerce.number().default(DEFAULT_PAGE_SIZE),
    page: z.coerce.number().default(DEFAULT_PAGE),
  });

  const parsedQuery = computed(() => {
    const result = querySchema.safeParse(route.query);
    return result.success ? result.data : querySchema.parse({});
  });

  const q = ref(parsedQuery.value.q ?? '');
  const qDebounced = refDebounced(q, debounceDelay);
  const categoryId = ref<number | null>(parsedQuery.value.categoryId ?? null);

  const { pagination, ...paginationControls } = usePagination(
    parsedQuery.value.perPage,
    parsedQuery.value.page,
  );

  const requestFiltersParams = computed<LocationQueryRaw>(() => ({
    q: qDebounced.value.trim() || undefined,
    categoryId: categoryId.value ?? undefined,
    page: pagination.page > DEFAULT_PAGE ? pagination.page : undefined,
    perPage: pagination.page > DEFAULT_PAGE ? pagination.perPage : undefined,
  }));

  const saveQuery = () => {
    router.replace({ query: requestFiltersParams.value as LocationQueryRaw });
  };

  const resetFilters = () => {
    q.value = '';
    categoryId.value = null;
    paginationControls.firstPage();
  };

  return {
    q,
    categoryId,
    saveQuery,
    requestFiltersParams,
    pagination,
    resetFilters,
    ...paginationControls,
  };
}
