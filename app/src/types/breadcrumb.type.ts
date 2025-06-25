import type { ShapeOf } from 'vue-nestjs-test-types';
import type { RouteLocationNormalizedLoaded, RouteMap } from 'vue-router';
import type { MessageSchema } from '@/i18n/message-schema';

export interface AppBreadcrumb<T extends keyof RouteMap> {
  to: string;
  label: ShapeOf<MessageSchema>;
  params?: Record<string, (route: RouteLocationNormalizedLoaded<T>) => string>;
}
