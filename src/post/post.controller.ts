import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentPostDto } from './dto/comment-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Req() req) {


    console.log("user ID:"+req.user.id)
    return await this.postService.create(req.body,req.user.id)
  }

  @Post('comment/:id')
  @UseGuards(JwtAuthGuard)
  async comments( @Body() commentPostDto:CommentPostDto,@Req() req, @Param('id')  id) {

    
    console.log("req body:"+ commentPostDto.commentBody)
    return await this.postService.comment(commentPostDto.commentBody,req.user.id,id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

}
