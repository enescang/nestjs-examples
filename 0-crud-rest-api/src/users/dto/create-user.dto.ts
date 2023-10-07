import { MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(4, { message: 'Please enter at least 4 chars' })
  name: string;

  bio?: string;
}
