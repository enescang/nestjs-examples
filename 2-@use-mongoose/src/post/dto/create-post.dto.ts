import { Length, IsString, MaxLength, IsMongoId } from 'class-validator';
import {Types} from 'mongoose';

export class CreatePostDto {
	@IsMongoId()
	author: Types.ObjectId;

  @Length(6, 20)
  title: string;

  @IsString()
  @MaxLength(1000)
  description: string;
}
