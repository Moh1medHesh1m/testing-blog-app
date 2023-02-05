import { UserRepository } from './users.repository';
import { UpdateUserDto } from './user.dto/updateUser.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './user.dto/createUser.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {

    constructor(

        // @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly userRepository:UserRepository
        
        
    ){
       
    }

    async createUser(user:CreateUserDto): Promise<User>{
      
        const newUser = await this.userRepository.create({
            name: user.name,
            email : user.email,
            password : await bcrypt.hash(user.password,10)
        })

        return newUser
        // try{
         
        //     return await newUser
        // }
        // catch(error){console.error(error)}
        

    }

    async getUserByEmail(email: string){
     
        
      const   user = await this.userRepository.findOne({email})
     
      return  user
    }


    
    async   findonebyid(id: string){
        console.log(id+"find")
      const   user = await this.userRepository.findOne({_id:id})
      console.log(user)
      return  user
    }

    async updateUser(id:ObjectId,updateuser: UpdateUserDto){
    
   
        const user  = await this.userRepository.findOneAndUpdate(id ,updateuser)

        return user
    }



    async login(){

    }


}
