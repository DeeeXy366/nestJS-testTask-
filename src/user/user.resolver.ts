import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Query(() => User)
  async getByIdUser(@Args('id') id: string) {
    return this.userService.getById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('userDto') userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Mutation(() => User)
  async removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateData') updateData: UpdateUserDto,
  ) {
    return this.userService.update(id, updateData);
  }

  @Mutation(() => User)
  async addGroupUser(@Args('id') id: string, @Args('userDto') userDto: string) {
    return this.userService.addGroup(id, userDto);
  }

  @Mutation(() => User)
  async removeFromGroupUser(
    @Args('id') id: string,
    @Args('userDto') userDto: string,
  ) {
    return this.userService.removeFromGroup(id, userDto);
  }

  @Mutation(() => User)
  async sendFriendRequestUser(
    @Args('id') id: string,
    @Args('userDto') userDto: string,
  ) {
    return this.userService.sendFriendRequest(id, userDto);
  }

  @Mutation(() => User)
  async acceptFriendRequestUser(
    @Args('id') id: string,
    @Args('userDto') userDto: string,
  ) {
    return this.userService.acceptFriendRequest(id, userDto);
  }

  @Mutation(() => User)
  async denyFriendRequestUser(
    @Args('id') id: string,
    @Args('userDto') userDto: string,
  ) {
    return this.userService.denyFriendRequest(id, userDto);
  }

  @Mutation(() => User)
  async deleteFriendUser(
    @Args('id') id: string,
    @Args('userDto') userDto: string,
  ) {
    return this.userService.deleteFriend(id, userDto);
  }
}
