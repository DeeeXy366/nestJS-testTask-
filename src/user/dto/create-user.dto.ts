import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Field()
  readonly nickname: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  @Field()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  @Field()
  password: string;

  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly friends: [];

  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly friendRequests: [];

  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly groups: [];
}
