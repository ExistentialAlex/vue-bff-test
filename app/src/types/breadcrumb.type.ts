import type { ShapeOf } from 'vue-nestjs-test-types';
import type { RouteLocationNormalized } from 'vue-router';
import type { MessageSchema } from '@/i18n/message-schema';

export interface AppBreadcrumb {
  to: string;
  label: ShapeOf<MessageSchema>;
  params?: Record<string, (route: RouteLocationNormalized) => string>;
}
