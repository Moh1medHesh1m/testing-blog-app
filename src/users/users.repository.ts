import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository {
    constructor(
   @InjectModel(User.name) private readonly userModel: Model<UserDocument>,    
    ){

    }
    async findone (userFilterQuery:FilterQuery<User>):Promise<User>{
        return this.userModel.findOne(userFilterQuery)
        
    }
    async find (userFilterQuery:FilterQuery<User>):Promise<User[]>{
        return this.userModel.find(userFilterQuery)
    }
    async create (user:User):Promise <User>{
        const newUser =  this.userModel.create(user)
        return newUser
    }
    async findOneAndUpdate(userFilterQuery:FilterQuery<User>,user:Partial<User>):Promise<User>{
        return this.findOneAndUpdate(userFilterQuery,user)
    }
}