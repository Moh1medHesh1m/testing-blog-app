import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model ,Document} from "mongoose";
import { EntityRepository } from "src/database/entity.repository";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(
   @InjectModel(User.name)  readonly userModel: Model<UserDocument>,    
    ){
super(userModel)
    }
    // async findone (userFilterQuery:FilterQuery<User>):Promise<User>{
    //     return this.userModel.findOne(userFilterQuery)
        
    // }
    // async find (userFilterQuery:FilterQuery<User>):Promise<User[]>{
    //     return this.userModel.find(userFilterQuery)
    // }
    // async create (user:User):Promise <User>{
    //     const newUser = new this.userModel({...user})
    //     return newUser.save()

    // }
    // async findOneAndUpdate(userFilterQuery:FilterQuery<User>,user:Partial<User>):Promise<User>{
    //     return this.findOneAndUpdate(userFilterQuery,user)
    // }
}