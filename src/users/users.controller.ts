import { Body, Controller, Post } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './user.dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
constructor(

    private readonly userservice: UsersService,
){

}

@Post('create')
async create(@Body() user: CreateUserDto){
  
    console.log("Body")
  return await this.userservice.createUser(user);
}
}
