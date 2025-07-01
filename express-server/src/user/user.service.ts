import { paginate } from '../utils';
import { CreateUserSchema, UpdateUserSchema, UserSchema } from 'vue-nestjs-test-schemas';
import { ColumnSort, PaginationResult } from 'vue-nestjs-test-types';

let users: UserSchema[] = [
  {
    id: 1,
    name: 'Alex Ashwood',
    jobTitle: 'Developer',
  },
];

// Add more dummy users
// This is just for testing purposes, in a real application you would fetch this from a database
for (let i = 0; i < 50; i++) {
  users.push({
    id: i + 2,
    name: `User ${i + 1}`,
    jobTitle: 'Developer',
  });
}

const getUser = (id: number): UserSchema => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};

const getUsers = (
  page: number,
  limit: number,
  search?: string,
  sort?: ColumnSort[]
): PaginationResult<UserSchema> => {
  return paginate(users, page, limit, search, sort);
};

const createUser = (user: CreateUserSchema): UserSchema => {
  const newUser: UserSchema = {
    id: users.length + 1,
    ...user,
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (id: number, user: UpdateUserSchema): UserSchema => {
  const existingUser = getUser(id);
  const updatedUser = { ...existingUser, ...user };
  users = users.map((u) => (u.id === id ? updatedUser : u));
  return updatedUser;
};

const deleteUser = (id: number): void => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  users.splice(userIndex, 1);
};

export { getUser, getUsers, createUser, updateUser, deleteUser };
