import { UpdateUserDto } from './user.dto/updateUser.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Patch, Req, Request, UseGuards } from '@nestjs/common/decorators';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './user.dto/createUser.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
constructor(

    private readonly userservice: UsersService,
){

}

@Post('create')
async create(@Body() user: User){
  
    
  return  this.userservice.createUser(user);
}


@UseGuards(JwtAuthGuard)
@Patch("update")
async update(@Req() req,@Body() user:UpdateUserDto){


  return  this.userservice.updateUser(req.user.id,user)
}

@Get('user-id/:id')
async getUser(@Param('id') id){

 return this.userservice.findonebyid(id)
}

}
