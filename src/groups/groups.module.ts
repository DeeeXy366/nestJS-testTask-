import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { GroupsController } from './groups.controller';
import { Groups, GroupsSchema } from './schemas/groups.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  providers: [GroupsService, GroupsResolver],
  controllers: [GroupsController],
  imports: [
    MongooseModule.forFeature([
      { name: Groups.name, schema: GroupsSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class GroupsModule {}
