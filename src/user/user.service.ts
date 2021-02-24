import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Groups } from '../groups/schemas/groups.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel,
    @InjectModel(Groups.name) public groupModel,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getById(id: string): Promise<User> {
    return this.userModel
      .findById(id)
      .populate('groups')
      .populate('friends')
      .populate('friendRequests');
  }

  async create(userDto: CreateUserDto): Promise<User> {
    userDto.password = await bcrypt.hash(
      userDto.password,
      await bcrypt.genSalt(),
    );

    const createdUser = await this.userModel.create(userDto);

    if (createdUser.friends.length !== 0) {
      await this.userModel.updateMany(
        { _id: userDto.friends },
        { $push: { friends: { $each: [createdUser._id] } } },
      );
    }
    if (createdUser.friendRequests.length !== 0) {
      await this.userModel.updateMany(
        { _id: userDto.friendRequests },
        { $push: { friendRequests: { $each: [createdUser._id] } } },
      );
    }
    if (createdUser.groups.length !== 0) {
      await this.groupModel.updateMany(
        { _id: userDto.groups },
        { $push: { users: { $each: [createdUser._id] } } },
      );
    }

    return createdUser;
  }

  async remove(id: string): Promise<User> {
    mongoose.set('useFindAndModify', false);

    const getData = await this.userModel.findById(id);

    await this.userModel.updateMany(
      { _id: getData.friends },
      { $pull: { friends: id } },
    );
    await this.userModel.updateMany(
      { _id: getData.friendRequests },
      { $pull: { friendRequests: id } },
    );
    await this.groupModel.updateMany(
      { _id: getData.groups },
      { $pull: { users: id } },
    );

    await this.userModel.findByIdAndRemove(id);
    return getData;
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {
    mongoose.set('useFindAndModify', false);

    const getData = await this.userModel.findById(id);

    if (updateData.password !== undefined) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        await bcrypt.genSalt(),
      );
    }

    if (updateData.friends !== undefined) {
      await this.userModel.updateMany(
        { _id: getData.friends },
        { $pull: { friends: id } },
      );
      if (updateData.friends.length !== 0) {
        await this.userModel.updateMany(
          { _id: updateData.friends },
          { $push: { friends: { $each: [id] } } },
        );
      }
    }
    if (updateData.friendRequests !== undefined) {
      await this.userModel.updateMany(
        { _id: getData.friendRequests },
        { $pull: { friendRequests: id } },
      );
      if (updateData.friendRequests.length !== 0) {
        await this.userModel.updateMany(
          { _id: updateData.friendRequests },
          { $push: { friendRequests: { $each: [id] } } },
        );
      }
    }
    if (updateData.groups !== undefined) {
      await this.groupModel.updateMany(
        { _id: getData.groups },
        { $pull: { users: id } },
      );
      if (updateData.groups.length !== 0) {
        await this.groupModel.updateMany(
          { _id: updateData.groups },
          { $push: { users: { $each: [id] } } },
        );
      }
    }

    return this.userModel.findByIdAndUpdate(id, updateData);
  }

  async addGroup(id: string, userDto: string): Promise<User> {
    const newUserInGroup = await this.groupModel.findById(userDto);
    const newUserGroup = await this.userModel.findById(id);

    if (
      newUserInGroup.users.indexOf(id) === -1 &&
      newUserGroup.groups.indexOf(userDto) === -1
    ) {
      newUserInGroup.users.push(newUserGroup._id);
      newUserGroup.groups.push(newUserInGroup._id);
    }

    await newUserInGroup.save();
    return await newUserGroup.save();
  }

  async removeFromGroup(id: string, userDto: string): Promise<User> {
    const userGroup = await this.groupModel.findById(userDto);
    const user = await this.userModel.findById(id);

    const userGroupIndex = userGroup.users.indexOf(id);
    const userIndex = user.groups.indexOf(userDto);

    if (userGroupIndex !== -1 && userIndex !== -1) {
      userGroup.users.splice(userGroupIndex, 1);
      user.groups.splice(userIndex, 1);
    }

    await userGroup.save();
    return await user.save();
  }

  async sendFriendRequest(id: string, userDto: string): Promise<User> {
    const user = await this.userModel.findById(id);
    const userFriend = await this.userModel.findById(userDto);

    if (
      user.friends.indexOf(id) === -1 &&
      userFriend.friends.indexOf(userDto) === -1 &&
      user.friendRequests.indexOf(id) === -1 &&
      userFriend.friendRequests.indexOf(userDto) === -1
    ) {
      userFriend.friendRequests.push(user._id);
    }

    return await userFriend.save();
  }

  async acceptFriendRequest(id: string, userDto: string): Promise<User> {
    const userReq = await this.userModel.findById(userDto);
    const user = await this.userModel.findById(id);

    const userReqIndex = user.friendRequests.indexOf(userDto);
    user.friendRequests.splice(userReqIndex, 1);

    userReq.friends.push(user._id);
    user.friends.push(userReq._id);

    await userReq.save();
    return await user.save();
  }

  async denyFriendRequest(id: string, userDto: string): Promise<User> {
    const user = await this.userModel.findById(id);

    const userReqIndex = user.friendRequests.indexOf(userDto);
    user.friendRequests.splice(userReqIndex, 1);

    return await user.save();
  }

  async deleteFriend(id: string, userDto: string): Promise<User> {
    const userDeleted = await this.userModel.findById(userDto);
    const user = await this.userModel.findById(id);

    const userDeletedIndex = userDeleted.friends.indexOf(id);
    const userIndex = user.friends.indexOf(userDto);

    if (userDeletedIndex !== -1 && userIndex !== -1) {
      userDeleted.friends.splice(userDeletedIndex, 1);
      user.friends.splice(userIndex, 1);
    }

    await userDeleted.save();
    return await user.save();
  }
}
