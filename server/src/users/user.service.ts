import { Injectable } from '@nestjs/common';
import { paginate } from 'src/utils/pagination';
import { CreateUserSchema, UserSchema } from 'vue-nestjs-test-schemas';

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
    const user = this.users.find((user: UserSchema) => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  getUsers(page: number, limit: number = 25) {
    return paginate(this.users, page, limit);
  }

  createUser(user: CreateUserSchema): UserSchema {
    const newUser: UserSchema = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
