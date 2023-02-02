import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { Post, PostSchema } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Module({
  imports:[

    DatabaseModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],

  controllers: [PostController],
  providers: [PostRepository,PostService]
})
export class PostModule {}
