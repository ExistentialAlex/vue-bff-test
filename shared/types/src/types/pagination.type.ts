export type PaginationResult<T> = {
  results: T[]; // The results for the current page.
  count: number; // The maximum number of records
  page: number; // The current page
  next?: number; // The next page number, if available
  prev?: number; // The previous page number, if available
};
