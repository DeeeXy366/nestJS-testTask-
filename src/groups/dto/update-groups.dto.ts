import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsOptional()
  @Field({ nullable: true })
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
