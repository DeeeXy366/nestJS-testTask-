import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './schemas/user.schema';
import { Groups, GroupsSchema } from '../groups/schemas/groups.schema';

@Module({
  providers: [UserService, UserResolver],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Groups.name, schema: GroupsSchema },
    ]),
  ],
})
export class UserModule {}
