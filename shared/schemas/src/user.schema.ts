import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  jobTitle: z
    .string()
    .min(1, 'Job title is required')
    .max(100, 'Job title must be less than 100 characters'),
});
export type UserSchema = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({ id: true });
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = UserSchema.partial().omit({ id: true });
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
