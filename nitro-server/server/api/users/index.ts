import { UserSchema } from 'vue-nestjs-test-schemas';

defineRouteMeta({
  openAPI: {
    parameters: [
      { in: 'query', name: 'page', required: true },
      { in: 'query', name: 'limit' },
      { in: 'query', name: 'search' },
      { in: 'query', name: 'sort' },
    ],
  },
});

export default defineEventHandler((event) => {
  const { page, limit, search, sort } = getQuery(event);

  const users: UserSchema[] = [
    {
      id: 1,
      name: 'Alex Ashwood',
      jobTitle: 'Developer',
    },
  ];

  for (let i = 1; i < 50; i++) {
    users.push({ id: i + 1, name: `User ${i}`, jobTitle: 'Developer' });
  }

  return paginate(users, Number(page), limit ? Number(limit) : undefined);
});
