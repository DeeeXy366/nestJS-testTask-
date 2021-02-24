import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupsDto } from './dto/create-gropus.dto';
import { UpdateGroupsDto } from './dto/update-groups.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getGropus(): Promise<any> {
    return {
      data: await this.groupsService.getAll(),
      success: true,
    };
  }

  @Get(':id')
  async getGroup(@Param('id') id: string): Promise<any> {
    return {
      data: await this.groupsService.getById(id),
      success: true,
    };
  }

  @Post()
  async create(@Body() data: CreateGroupsDto): Promise<any> {
    return {
      data: await this.groupsService.create(data),
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return {
      data: await this.groupsService.remove(id),
      success: true,
    };
  }

  @Put(':id')
  async update(
    @Body() updateData: UpdateGroupsDto,
    @Param('id') id: string,
  ): Promise<any> {
    return {
      data: await this.groupsService.update(id, updateData),
      success: true,
    };
  }
}
