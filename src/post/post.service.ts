import {  SearchForMultiplePosts } from './dto/search-multiple-posts.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CommentPostDto } from './dto/comment-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepoistory:PostRepository
   
  ){

  }
  async create(createPostDto: CreatePostDto,userId:ObjectId) {

    console.log("created")

    return  await this.postRepoistory.create({
      createdby: userId,
      ...createPostDto
    })
  }

  async comment ( commentBody: string, userId:ObjectId,postId:ObjectId):Promise<Post>{

    

    try{
      const found = await this.postRepoistory.findOne({_id:postId})
      const {comments} = found
      console.log("found:"+found)
      if(!found)
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'This post not found',
        }, HttpStatus.NOT_FOUND);
    const newComment = {
      createdby:userId,
      commentBody
    }
        const updatedPost = await this.postRepoistory.findOneAndUpdate({_id:postId},{

            comments: [...comments, newComment  ]
        })
      return updatedPost
    }
    catch(error){
    console.log(error)
    }
    
    }
    
    
    
  

  async paginatePosts(skips:number,limits:number) {
      const findall = await this.postRepoistory.find({}, {_id:false},{limit:limits,skip:skips})
console.log(findall)
  
     return findall
  }

  async searchForMultiplePosts(searchForMultiplePosts:SearchForMultiplePosts) {

   const {posts} = searchForMultiplePosts
      
   let find =[]

   
      for (let post of posts){
      
        let found = await this.postRepoistory.find({_id:post.id})
        // console.log(found)
    
        if(found)
       find=  [...find,...found]
        
       
      }
 console.log(find)
 return find   
    
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
