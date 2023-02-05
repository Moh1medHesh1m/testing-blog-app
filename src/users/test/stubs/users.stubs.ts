import { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreateUserDto } from 'src/users/user.dto/createUser.dto';

export const userStub: User = {
  _id: new Types.ObjectId(32),
  email: 'user@example.com',
  name: '',
  password: ''
};

export const testUser: CreateUserDto = {
    email: 'test@example.com',
    password: 'password',
    name: 'test'
};