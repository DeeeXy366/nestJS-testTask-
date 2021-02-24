import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersPostgresService } from './usersPostgres.service';
import { CreateUsersPostgresDto } from './dto/create-usersPostgres.dto';

@Controller('userPostgres')
export class UsersPostgresController {
  constructor(private readonly userService: UsersPostgresService) {}

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
  async create(@Body() data: CreateUsersPostgresDto): Promise<any> {
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

  // @Put(':id')
  // async update(
  //   @Body() updateData: UpdateUserDto,
  //   @Param('id') id: string,
  // ): Promise<any> {
  //   return {
  //     data: await this.userService.update(id, updateData),
  //     success: true,
  //   };
  // }
}
