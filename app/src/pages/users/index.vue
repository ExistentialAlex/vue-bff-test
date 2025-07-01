<script setup lang="ts">
import { UserSchema } from 'vue-nestjs-test-schemas';
import type { TableColumn } from '@nuxt/ui';
import type { Row } from '@tanstack/vue-table';
import { h, resolveComponent, watch } from 'vue';
import { useRouter } from 'vue-router';
import { PaginatedTable } from '../../components';
import { useApiPagination } from '@/composables';
import doublet from 'doublet';
import { FetchError, ofetch } from 'ofetch';

const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const ULink = resolveComponent('ULink');

const router = useRouter();

definePage({
  meta: {
    requiresAuth: true,
    breadcrumbs: [
      {
        to: '/users',
        label: 'users.breadcrumbs.list',
      },
    ],
  },
});

const toast = useToast();

const columns: TableColumn<UserSchema>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => {
      return h(
        ULink,
        {
          to: `/users/${row.original.id}`,
          class: 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400',
        },
        () => row.getValue('name')
      );
    },
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Name',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    accessorKey: 'jobTitle',
    header: 'Job Title',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            })
        )
      );
    },
  },
];

const getRowItems = (row: Row<UserSchema>) => {
  return [
    {
      type: 'label',
      label: 'Actions',
    },
    {
      label: 'Copy User ID',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.id.toString());

        toast.add({
          title: 'User ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check',
        });
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'View',
      onSelect: () => router.push(`/users/${row.original.id}`),
      icon: 'i-lucide-eye',
    },
    {
      label: 'Edit',
      onSelect: () => router.push(`/users/edit/${row.original.id}`),
      icon: 'i-lucide-edit',
    },
    {
      type: 'separator',
    },
    {
      label: 'Delete',
      onSelect: async () => {
        const [err, res] = await doublet(ofetch<{ id: number }>, `/api/users/${row.original.id}`, {
          method: 'DELETE',
        });
        if (err) {
          toast.add({
            title: 'Error deleting user',
            description: (err as FetchError).data?.message || 'An unexpected error occurred.',
            color: 'error',
            icon: 'i-lucide-alert-triangle',
          });
          return;
        }

        toast.add({
          title: 'User deleted successfully',
          description: `User with ID ${res.id} has been deleted.`,
          color: 'success',
          icon: 'i-lucide-circle-check',
        });

        // Refresh the user list
        await refresh();
      },
      icon: 'i-lucide-trash',
    },
  ];
};

const { limit, page, limitItems, pagination, data, pending, search, sort, error, refresh } =
  useApiPagination<UserSchema>('/api/users');

watch([error], ([err]) => {
  if (err) {
    toast.add({
      title: 'Error fetching users',
      description: err.data?.message || 'An unexpected error occurred.',
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  }
});
</script>
<template>
  <div class="">
    <div class="flex flex-col gap-8 p-8">
      <h1 class="text-2xl">Users</h1>
      <span class="flex gap-4">
        <UInput v-model="search" class="w-full" icon="i-fe-search" size="lg" />
        <ULink to="/users/create" class="whitespace-nowrap">
          <UButton size="lg" icon="i-fe-plus">Create User </UButton>
        </ULink>
      </span>
    </div>
    <hr class="my-4 border-neutral-200 dark:border-neutral-700" />
    <div class="flex flex-col items-center gap-4 p-8">
      <PaginatedTable
        v-model:pagination="pagination"
        v-model:limit="limit"
        v-model:page="page"
        v-model:sort="sort"
        :data="data?.results || []"
        :limit-items="limitItems"
        :total-data="data?.count"
        :columns="columns"
        :loading="pending"
      />
    </div>
  </div>
</template>
