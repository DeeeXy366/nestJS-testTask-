import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Groups } from '../../groups/schemas/groups.schema';
import * as mongoose from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ type: String, required: true })
  nickname: string;

  @Field()
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Field()
  @Prop({ type: String, required: true })
  password: string;

  @Field(() => [Groups])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Groups' }] })
  groups: Groups[];

  @Field(() => [User])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friendRequests: User[];

  @Field(() => [User])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
