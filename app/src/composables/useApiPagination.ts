import { ofetch, FetchError, type FetchOptions } from 'ofetch';
import { destr } from 'destr';
import { deepEqual } from 'fast-equals';
import { useRoute, useRouter } from 'vue-router';
import { computed, onBeforeMount, onMounted, ref, watch, type Ref } from 'vue';
import type { ColumnSort, PaginationResult } from 'vue-nestjs-test-types';
import { convertQueryStringToSort, convertSortToQueryString } from 'vue-nestjs-test-utilities';
import { useQuery } from './useQuery';
import { refDebounced } from '@vueuse/core';
import doublet from 'doublet';

const defaultPage = 1;
const defaultLimit = 25;
const defaultSearch = '';
const defaultSort: ColumnSort[] = [];

export const useApiPagination = <T>(request: string, opts?: FetchOptions<'json'>) => {
  const route = useRoute();
  const router = useRouter();
  const { getQueryParamValue } = useQuery();

  onBeforeMount(() => {
    page.value = getQueryParamValue(route, 'page', (v) => Number(v), defaultPage);
    limit.value = getQueryParamValue(route, 'limit', (v) => Number(v), defaultLimit);
    sort.value = getQueryParamValue(route, 'sort', (v) => convertQueryStringToSort(v), defaultSort);
    search.value = getQueryParamValue(route, 'search', (v) => v, defaultSearch);
  });

  const data = ref<PaginationResult<T> | undefined>(undefined);
  const error = ref<FetchError | undefined>(undefined);
  const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle');
  const pending = computed(() => status.value === 'pending');

  const page = ref<number>(getQueryParamValue(route, 'page', (v) => Number(v), defaultPage));
  const search = ref<string>(getQueryParamValue(route, 'search', (v) => v, defaultSearch));
  const limit = ref<number>(getQueryParamValue(route, 'limit', (v) => Number(v), defaultLimit));
  const sort = ref<ColumnSort[]>(
    getQueryParamValue(route, 'sort', (v) => destr<ColumnSort[]>(v), defaultSort)
  );

  const defaultPageChanged = computed(() => !deepEqual(defaultPage, page.value));
  const defaultLimitChanged = computed(() => !deepEqual(defaultLimit, limit.value));
  const defaultSortChanged = computed(() => !deepEqual(defaultSort, sort.value));
  const defaultSearchChanged = computed(() => !deepEqual(defaultSearch, debouncedSearch.value));

  const debouncedSearch = refDebounced(search, 500);

  const limitItems = [1, 5, 10, 25, 50];
  const pagination = computed(() => ({
    pageIndex: page.value - 1,
    pageSize: limit.value,
  }));

  const options = computed<FetchOptions<'json'>>(() => {
    const base: FetchOptions<'json'> = {
      params: {
        page: page.value,
        limit: limit.value,
        search: debouncedSearch.value,
        sort: sort.value,
      },
      onResponse() {
        // Store the page changes in the current route to allow sharing the values around.
        router.replace({
          query: {
            ...(defaultPageChanged.value && { page: page.value }),
            ...(defaultSortChanged.value && { sort: convertSortToQueryString(sort.value) }),
            ...(defaultLimitChanged.value && { limit: limit.value }),
            ...(defaultSearchChanged.value && { search: search.value }),
          },
        });
      },
      responseType: 'json',
    };

    if (opts) {
      return {
        ...base,
        ...opts,
      };
    }

    return base;
  });

  const execute = async () => {
    status.value = 'pending';

    const [err, res] = await doublet(ofetch<PaginationResult<T>>, request, options.value);

    if (err) {
      status.value = 'error';
      data.value = undefined;
      error.value = err as FetchError;
      return;
    }

    status.value = 'success';
    error.value = undefined;
    data.value = res;
  };

  const clear = async () => {
    status.value = 'idle';
    data.value = undefined;
    error.value = undefined;
  };

  watch([sort, debouncedSearch, limit], ([sort, search, limit], [oldSort, oldSearch, oldLimit]) => {
    const limitChanged = !deepEqual(oldLimit, limit);
    const sortChanged = !deepEqual(oldSort, sort);
    const searchChanged = !deepEqual(oldSearch, search);

    if (!sortChanged && !searchChanged && !limitChanged) {
      return;
    }

    page.value = 1;
  });

  watch([page, debouncedSearch, sort, limit], async () => {
    await execute();
  });

  onMounted(async () => {
    await execute();
  });

  return {
    page,
    limit,
    search,
    sort,
    pagination,
    limitItems,
    data,
    status,
    clear,
    error,
    execute,
    pending,
    refresh: execute,
  };
};
