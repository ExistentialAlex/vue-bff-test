import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { RouteHrefs } from 'vue-nestjs-test-types';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(String(RouteHrefs.users))
  getUsers() {
    return this.userService.getUsers(1); // Default to page 1
  }
}
