import { UpdateUserSchema } from 'vue-nestjs-test-schemas';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    });
  }

  const { name, jobTitle } = await readValidatedBody(event, UpdateUserSchema.parse);

  return { id, name, jobTitle };
});
