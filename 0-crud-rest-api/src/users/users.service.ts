import { Injectable } from '@nestjs/common';
import { UserData } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from 'src/common/errors/user-not-found.exception';

@Injectable()
export class UsersService {
  private users: UserData[] = [
    { id: '1', name: 'User 1', bio: 'User 1 bio' },
    { id: '2', name: 'User 2', bio: 'User 2 bio' },
    { id: '3', name: 'User 3', bio: 'User 3 bio' },
    { id: '4', name: 'User 4', bio: 'User 4 bio' },
  ];

  getUsers(): UserData[] {
    return this.users;
  }

  getUser(id: string): UserData {
    const user = this.users.find((u: UserData) => u.id === id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): UserData {
    const user: UserData = {
      ...createUserDto,
      id: Math.floor(Math.random() * 1000).toString(),
    };

    this.users.push(user);
    return user;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): UserData {
    const current_user = this.getUser(id);
    this.users = this.users.map((user) => {
      if (user.id === current_user.id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.getUser(id);
  }

  deleteUser(id: string): UserData {
    const current_user = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== current_user.id);
    return current_user;
  }
}
