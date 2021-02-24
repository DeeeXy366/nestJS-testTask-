import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class CreateGroupsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @Field()
  readonly logo: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
  @Field({ nullable: true })
  readonly desc: string;

  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly users: [];
}
