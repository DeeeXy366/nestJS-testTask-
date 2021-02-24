import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { Groups } from './schemas/groups.schema';
import { CreateGroupsDto } from './dto/create-gropus.dto';
import { UpdateGroupsDto } from './dto/update-groups.dto';

@Resolver()
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => [Groups])
  async getAllGroups() {
    return this.groupsService.getAll();
  }

  @Query(() => Groups)
  async getByIdGroup(@Args('id') id: string) {
    return this.groupsService.getById(id);
  }

  @Mutation(() => Groups)
  async createGroup(@Args('groupDto') groupDto: CreateGroupsDto) {
    return this.groupsService.create(groupDto);
  }

  @Mutation(() => Groups)
  async removeGroup(@Args('id') id: string) {
    return this.groupsService.remove(id);
  }

  @Mutation(() => Groups)
  async updateGroup(
    @Args('id') id: string,
    @Args('updateData') updateData: UpdateGroupsDto,
  ) {
    return this.groupsService.update(id, updateData);
  }
}
