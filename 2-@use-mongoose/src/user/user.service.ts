import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    await user.save();
    return user;
  }

  async getAllUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.find({});
    return users;
  }
}
