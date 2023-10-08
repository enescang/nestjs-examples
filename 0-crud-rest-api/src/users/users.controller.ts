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
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundException } from 'src/common/errors/user-not-found.exception';
import { HttpExceptionFilter } from 'src/common/errors/global-exception.filter';
import { UpdateUserDto } from './dto/update-user.dto';

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
    try {
      return this.usersService.createUser(createUserDto);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    try {
      return this.usersService.deleteUser(id);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
