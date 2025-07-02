import type { ColumnSort } from 'vue-nestjs-test-types';

/**
 * Utility functions for converting sorting parameters between different formats.
 * @param sort The array of ColumnSort objects to convert.
 * @returns A string representation of the sort parameters, formatted as a query string.
 * @example
 * convertSortToQueryString([{ id: 'name', desc: false }, { id: 'age', desc: true }])
 * // Returns 'name,-age'
 */
export const convertSortToQueryString = (sort: ColumnSort[]): string => {
  if (!sort || sort.length === 0) {
    return '';
  }
  return sort.map((s) => `${s.desc ? '-' : ''}${s.id}`).join(',');
};

/**
 * Converts a query string formatted as 'id1,id2,-id3' into an array of ColumnSort objects.
 * @param queryString The query string to convert, formatted as 'id1,id2,-id3'.
 * @returns An array of ColumnSort objects representing the sorting parameters.
 * @example
 * convertQueryStringToSort('name,-age')
 * // Returns [{ id: 'name', desc: false }, { id: 'age', desc: true }]
 */
export const convertQueryStringToSort = (queryString: string): ColumnSort[] => {
  if (!queryString) {
    return [];
  }
  return queryString.split(',').map((s) => {
    const desc = s.startsWith('-');
    const id = desc ? s.slice(1) : s;
    return { id, desc };
  });
};
