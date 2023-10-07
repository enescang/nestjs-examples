import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ValidationPipe,
  NotFoundException,
  InternalServerErrorException,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundException } from 'src/common/errors/user-not-found.exception';
import { HttpExceptionFilter } from 'src/common/errors/global-exception.filter';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    try {
      return this.usersService.getUser(id);
    } catch (err) {
      //Example of customized Error.
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('/create')
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
