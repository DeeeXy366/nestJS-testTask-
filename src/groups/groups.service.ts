import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGroupsDto } from './dto/create-gropus.dto';
import { UpdateGroupsDto } from './dto/update-groups.dto';
import { Groups } from './schemas/groups.schema';
import { User } from '../user/schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Groups.name) public groupModel,
    @InjectModel(User.name) public userModel,
  ) {}

  async getAll(): Promise<Groups[]> {
    return this.groupModel.find();
  }

  async getById(id: string): Promise<Groups> {
    return this.groupModel.findById(id).populate('users');
  }

  async create(groupDto: CreateGroupsDto): Promise<Groups> {
    const createdGroup = await this.groupModel.create(groupDto);

    if (createdGroup.users.length !== 0) {
      await this.userModel.updateMany(
        { _id: groupDto.users },
        { $push: { groups: { $each: [createdGroup._id] } } },
      );
    }

    return createdGroup;
  }

  async remove(id: string): Promise<Groups> {
    mongoose.set('useFindAndModify', false);

    const getData = await this.groupModel.findById(id);

    await this.userModel.updateMany(
      { _id: getData.users },
      { $pull: { groups: id } },
    );

    await this.groupModel.findByIdAndRemove(id);
    return getData;
  }

  async update(id: string, updateData: UpdateGroupsDto): Promise<Groups> {
    mongoose.set('useFindAndModify', false);

    if (updateData.users !== undefined) {
      const getData = await this.groupModel.findById(id);

      await this.userModel.updateMany(
        { _id: getData.users },
        { $pull: { groups: id } },
      );
      if (updateData.users.length !== 0) {
        await this.userModel.updateMany(
          { _id: updateData.users },
          { $push: { groups: { $each: [id] } } },
        );
      }
    }

    return await this.groupModel.findByIdAndUpdate(id, updateData);
  }
}
