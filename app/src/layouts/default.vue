<script setup lang="ts">
import { useSidebar, useUserSession } from '@/composables';
import type { IAppBreadcrumb } from 'vue-nestjs-test-types';
import AppNavbar from '@/components/app-navbar.vue';

const { loggedIn, user } = useUserSession();
const { sidebarModel, sidebarItems } = useSidebar();
</script>
<template>
  <div class="[ app ] flex min-h-screen">
    <div
      v-if="loggedIn"
      class="flex h-screen flex-col border-r border-neutral-200 p-4 dark:border-neutral-700"
    >
      <div class="mb-4 flex items-center gap-3">
        <UAvatar :alt="user?.name" />
        <div v-if="sidebarModel" class="flex flex-col justify-center whitespace-nowrap">
          <h5 id="user-name" data-testid="user-name" class="text-xs">
            {{ user?.name }}
          </h5>
          <span id="user-role" data-testid="user-role" class="text-start text-[10px]">
            {{ user?.jobTitle }}
          </span>
        </div>
      </div>
      <UNavigationMenu
        :collapsed="!sidebarModel"
        :items="sidebarItems"
        orientation="vertical"
        variant="pill"
        tooltip
      />
    </div>
    <main id="app-main" class="grid flex-1">
      <AppNavbar
        v-if="loggedIn"
        v-model:sidebar="sidebarModel"
        :breadcrumbs="$route.meta.breadcrumbs as IAppBreadcrumb[]"
      />
      <router-view></router-view>
    </main>
  </div>
</template>
<style>
#app-main {
  grid-template-rows: auto 1fr;
}
</style>
