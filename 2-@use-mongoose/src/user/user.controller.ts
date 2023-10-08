import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@UsePipes(new ValidationPipe())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response;
  }

  @Get()
  async getAll() {
    const users = await this.userService.getAllUsers();
    return users;
  }
}
