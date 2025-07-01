import { Injectable } from '@nestjs/common';
import { paginate } from 'src/utils/pagination';
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserSchema,
} from 'vue-nestjs-test-schemas';
import { ColumnSort, PaginationResult } from 'vue-nestjs-test-types';

@Injectable()
export class UserService {
  users: UserSchema[] = [];

  constructor() {
    // Initialize with some dummy data
    this.users = [
      {
        id: 1,
        name: 'Alex Ashwood',
        jobTitle: 'Developer',
      },
    ];

    // Add more dummy users
    // This is just for testing purposes, in a real application you would fetch this from a database
    for (let i = 0; i < 50; i++) {
      this.users.push({
        id: i + 2,
        name: `User ${i + 1}`,
        jobTitle: 'Developer',
      });
    }
  }

  getUser(id: number): UserSchema {
    return {
      id,
      name: 'Alex Ashwood',
      jobTitle: 'Developer',
    };
  }

  getUsers(
    page: number,
    limit: number,
    search?: string,
    sort?: ColumnSort[],
  ): PaginationResult<UserSchema> {
    return paginate(this.users, page, limit, search, sort);
  }

  createUser(user: CreateUserSchema): UserSchema {
    const newUser: UserSchema = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, user: UpdateUserSchema): UserSchema {
    const existingUser = this.getUser(id);
    const updatedUser = { ...existingUser, ...user };
    this.users = this.users.map((u) => (u.id === id ? updatedUser : u));
    return updatedUser;
  }

  deleteUser(id: number): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
