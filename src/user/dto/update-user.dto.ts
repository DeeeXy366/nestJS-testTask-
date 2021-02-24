import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  @Field({ nullable: true })
  readonly nickname: string;

  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  @IsOptional()
  @Field({ nullable: true })
  readonly email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(40)
  @IsOptional()
  @Field({ nullable: true })
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
