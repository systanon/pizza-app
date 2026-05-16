import type { LocationQueryRaw } from 'vue-router';
import { PAGINATION_CONFIG } from '~/constants';

export function useFilters(debounceDelay: number = 550) {
  const route = useRoute();
  const router = useRouter();

  const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = PAGINATION_CONFIG;

  const q = ref(fromQuery(route.query.q, isValidString, ''));
  const qDebounced = refDebounced(q, debounceDelay);
  const sortOrder = ref(fromQuery(route.query.sortOrder, isValidSortOrder, 'DESC'));

  const page = Number(route.query.page) || DEFAULT_PAGE;
  const perPage = Number(route.query.perPage) || DEFAULT_PAGE_SIZE;

  const { pagination, firstPage, prevPage, nextPage, latestPage, btnPage, setPages } =
    usePagination(perPage, page);

  const categoryid = ref(route.query.categoryId ? Number(route.query.categoryId) : null);

  const requestFiltersParams = computed<LocationQueryRaw>(() => {
    return {
      q: isValidString(qDebounced.value) ? qDebounced.value.trim() : undefined,
      sortOrder: sortOrder.value === 'ASC' ? 'ASC' : undefined,
      categoryId: categoryid.value ?? undefined,
      perPage: DEFAULT_PAGE_SIZE === pagination.perPage ? undefined : pagination.perPage,
      page: DEFAULT_PAGE === pagination.page ? undefined : pagination.page,
    };
  });

  function fromQuery<T>(value: unknown, validate: (v: string) => boolean, fallback: T): T {
    return typeof value === 'string' && validate(value) ? (value as T) : fallback;
  }

  function isValidString(value: string): boolean {
    return !!value && value.trim().length > 0;
  }

  function isValidSortOrder(value: string | null | undefined): boolean {
    return value === 'ASC' || value === 'DESC';
  }

  const saveQuery = () => {
    router.replace({ query: requestFiltersParams.value as LocationQueryRaw });
  };

  const resetFilters = () => {
    q.value = '';
    sortOrder.value = 'DESC';
    categoryid.value = null;
    firstPage();
  };

  return {
    q,
    sortOrder,
    categoryid,
    saveQuery,
    requestFiltersParams,
    pagination,
    firstPage,
    prevPage,
    nextPage,
    latestPage,
    btnPage,
    setPages,
    resetFilters,
  };
}
