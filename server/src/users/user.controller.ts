import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RouteHrefs } from 'vue-nestjs-test-types';
import { CreateUserSchema, UpdateUserSchema } from 'vue-nestjs-test-schemas';
import { convertQueryStringToSort } from 'vue-nestjs-test-utilities';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get a paginated list of users.
   * @param page The page number to retrieve.
   * @param limit The number of users per page.
   * @param search The search term to filter users.
   * @param sort The field to sort users by.
   * @returns A paginated result of users.
   */
  @Get(String(RouteHrefs.users))
  getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search: string = '',
    @Query('sort') sort: string = '',
  ) {
    return this.userService.getUsers(
      page,
      limit,
      search,
      convertQueryStringToSort(sort),
    );
  }

  /**
   * Get a user by ID.
   * @param id The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  @Get(String(RouteHrefs.user))
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  /**
   * Create a new user.
   * @param user The user data to create.
   * @returns The created user.
   */
  @Post(String(RouteHrefs.users))
  createUser(@Body() user: CreateUserSchema) {
    return this.userService.createUser(user);
  }

  /**
   * Update an existing user by ID.
   * @param id The ID of the user to update.
   * @param user The updated user data.
   * @returns The updated user.
   */
  @Patch(String(RouteHrefs.user))
  updateUser(@Param('id') id: number, @Body() user: UpdateUserSchema) {
    return this.userService.updateUser(id, user);
  }

  /**
   * Delete a user by ID.
   * @param id The ID of the user to delete.
   * @returns A confirmation message or the deleted user.
   */
  @Delete(String(RouteHrefs.user))
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
