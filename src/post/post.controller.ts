
import { ObjectId } from 'mongoose';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentPostDto } from './dto/comment-post.dto';
import { SearchForMultiplePosts } from './dto/search-multiple-posts.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Req() req) {


    console.log("user ID:"+req.user.id)
    console.log("post dto:"+createPostDto)
    
    return await this.postService.create(createPostDto,req.user.id)
  }

  @Post('comment/:id')
  @UseGuards(JwtAuthGuard)
  async comments( @Body() commentPostDto:CommentPostDto,@Req() req , @Param('id')  id : ObjectId) {

    


    
    console.log("req body:"+ commentPostDto.commentBody)
    return await this.postService.comment(commentPostDto.commentBody,req.user.id,id)
  }



  @Get()
  async findAll(@Query('skip',ParseIntPipe) skip:number , @Query('limit', ParseIntPipe)  limit:number){
    
    return await this.postService.paginatePosts(skip,limit)
  }



@Post('search')

async search(@Body() searchForMultiplePosts:SearchForMultiplePosts){
  return await this.postService.searchForMultiplePosts(searchForMultiplePosts)
}

}
