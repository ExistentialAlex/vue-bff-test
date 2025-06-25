import { CreateUserSchema } from 'vue-nestjs-test-schemas';

defineRouteMeta({
  openAPI: {
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              jobTitle: { type: 'string' },
            },
          },
        },
      },
    },
  },
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, CreateUserSchema.parse);

  return { id: 1, ...body };
});
