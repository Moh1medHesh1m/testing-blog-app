import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import { Post, PostDocument } from "./entities/post.entity";


@Injectable()
export class PostRepository  extends EntityRepository<PostDocument>{
    constructor(
   @InjectModel(Post.name)  readonly postModel: Model<PostDocument>,    

        
    ){
        super(postModel)  
    }
   
}