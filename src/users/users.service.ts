import { UserRepository } from './users.repository';
import { UpdateUserDto } from './user.dto/updateUser.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './user.dto/createUser.dto';
import * as bcrypt from 'bcrypt'
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {

    constructor(

        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly userRepository:UserRepository
        
        
    ){
       
    }

    async createUser(user:User){
        // console.log("error")
        // const newUser = this.userRepository.create({
        //     ...user,
        //     password : await bcrypt.hash(user.password,10)
        // })
      
        const newUser = this.userRepository.create({
            _id:user._id,
            name: user.name,
            email : user.email,
            password : await bcrypt.hash(user.password,10)
        })
        try{
            return await newUser
        }
        catch(error){console.error(error)}
        

    }

    async getUserByEmail(email: string){
        console.log("error")
      const   user = await this.userModel.findOne({email})
      return  user
    }


    
    async findonebyid(id: string){
        console.log("error")
      const   user = await this.userModel.findById({id})
      return  user
    }

    async updateUser(id:any,updateuser: UpdateUserDto){
        // const find = await this.userModel.findById(id)
        // if(!find){
        //     throw new UnauthorizedException()
        // }
        console.log("done")
        const user  = await this.userModel.findByIdAndUpdate(id ,updateuser)

        return user
    }
    async login(){

    }


}
