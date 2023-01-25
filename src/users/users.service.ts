import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './user.dto/createUser.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(

        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        
        
    ){
       
    }

    async createUser(user:CreateUserDto){
        console.log("hi")
        const newUser = this.userModel.create({
            name: user.name,
            email : user.email,
            password : await bcrypt.hash(user.password,10)
        })
        try{
            await newUser
        }
        catch(error){console.error(error)}
        

    }

    async login(){

    }


}
