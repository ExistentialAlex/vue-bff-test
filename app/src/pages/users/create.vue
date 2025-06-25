<script lang="ts" setup>
import doublet from 'doublet';
import { FetchError, ofetch } from 'ofetch';
import { reactive } from 'vue';
import { UpdateUserSchema, UserSchema } from 'vue-nestjs-test-schemas';
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';

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
        label: 'users.breadcrumbs.edit',
        params: {
          id: (route: RouteLocationNormalizedLoaded<'/users/edit/[id]'>) =>
            route.params.id as string,
        },
      },
    ],
  },
});

const toast = useToast();
const router = useRouter();

const model = reactive<UpdateUserSchema>({
  name: '',
  jobTitle: '',
});

const onSubmit = async () => {
  const [err, data] = await doublet(ofetch<UserSchema>, '/api/users/create', {
    method: 'POST',
    body: model,
  });

  if (err) {
    toast.add({
      title: 'Error Creating User',
      description: (err as FetchError).message || 'An error occurred while creating user data.',
      color: 'error',
    });
    return;
  }

  toast.add({
    title: 'User Created Successfully',
    description: `User ${data.name} has been created.`,
    color: 'success',
  });

  router.push(`/users/${data.id}`);
};
</script>

<template>
  <div class="p-4">
    <UForm class="flex flex-col gap-4" :state="model" :schema="UpdateUserSchema" @submit="onSubmit">
      <UFormField label="Name" name="name">
        <UInput v-model="model.name" class="w-full" />
      </UFormField>
      <UFormField label="Job Title" name="jobTitle">
        <UInput v-model="model.jobTitle" class="w-full" />
      </UFormField>
      <UButton type="submit" class="justify-center">Create</UButton>
    </UForm>
  </div>
</template>
