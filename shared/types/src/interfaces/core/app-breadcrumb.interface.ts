import type { ShapeOf } from '../../types/shape-of.type';

export interface IAppBreadcrumb {
  label: ShapeOf<{}>;
  params?: Record<string, (route: any) => string>;
}
