import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<any> {
    return {
      data: await this.userService.getAll(),
      success: true,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<any> {
    return {
      data: await this.userService.getById(id),
      success: true,
    };
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<any> {
    return {
      data: await this.userService.create(data),
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return {
      data: await this.userService.remove(id),
      success: true,
    };
  }

  @Put(':id')
  async update(
    @Body() updateData: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.userService.update(id, updateData),
      success: true,
    };
  }

  @Put('addGroup/:id')
  async addGroup(
    @Body('groups') data: string,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.userService.addGroup(id, data),
      success: true,
    };
  }

  @Delete('removeFromGroup/:id')
  async removeFromGroup(
    @Body('groups') data: string,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.userService.removeFromGroup(id, data),
      success: true,
    };
  }

  @Put('sendFriendRequest/:id')
  async sendFriendRequest(
    @Body('friend') data: string,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.userService.sendFriendRequest(id, data),
      success: true,
    };
  }

  @Put('acceptFriendRequest/:id')
  async acceptFriendRequest(
    @Body('friend') data: string,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.userService.acceptFriendRequest(id, data),
      success: true,
    };
  }

  @Put('denyFriendRequest/:id')
  async denyFriendRequest(
    @Body('friend') data: string,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.userService.denyFriendRequest(id, data),
      success: true,
    };
  }

  @Put('deleteFriend/:id')
  async deleteFriend(
    @Body('friend') data: string,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.userService.deleteFriend(id, data),
      success: true,
    };
  }
}
