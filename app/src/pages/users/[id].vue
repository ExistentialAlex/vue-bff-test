<script lang="ts" setup>
import doublet from 'doublet';
import { FetchError, ofetch } from 'ofetch';
import { onMounted, ref } from 'vue';
import type { UserSchema } from 'vue-nestjs-test-schemas';
import { useRoute, type RouteLocationNormalized } from 'vue-router';

definePage({
  meta: {
    requiresAuth: true,
    breadcrumbs: [
      {
        to: '/users',
        label: 'users.breadcrumbs.list',
      },
      {
        to: '',
        label: 'users.breadcrumbs.view',
        params: { id: (route: RouteLocationNormalized) => route.params.id as string },
      },
    ],
  },
});

const toast = useToast();
const route = useRoute();
const data = ref<UserSchema | undefined>(undefined);

onMounted(async () => {
  const [err, userData] = await doublet(ofetch<UserSchema>, `/api/users/${route.params.id}`);

  if (err) {
    toast.add({
      title: 'Error Fetching User',
      description: (err as FetchError).message || 'An error occurred while fetching user data.',
      color: 'error',
    });
    return;
  }

  data.value = userData;
});
</script>

<template>
  <div>
    <h1>User Profile: {{ data?.id }}</h1>
    <p>Name: {{ data?.name }}</p>
    <p>Email: {{ data?.jobTitle }}</p>
  </div>
</template>
