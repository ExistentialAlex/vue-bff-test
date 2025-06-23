import type { II18nFunctions } from '../interfaces';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ShapeOf<T extends Record<string, any>> = keyof {
  [K in keyof T as T[K] extends string
    ? K
    : T[K] extends (functions: II18nFunctions) => string
      ? K
      : T[K] extends Record<string, unknown>
        ? `${K & string}.${ShapeOf<T[K]> & string}`
        : never]: any;
};
