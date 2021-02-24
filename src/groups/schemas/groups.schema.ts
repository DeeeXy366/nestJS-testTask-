import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Groups {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ type: String, required: true, unique: true })
  logo: string;

  @Field()
  @Prop({ type: String })
  desc: string;

  @Field(() => [User])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const GroupsSchema = SchemaFactory.createForClass(Groups);
