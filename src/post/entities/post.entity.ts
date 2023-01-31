import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document, Types } from 'mongoose';
import { CpuInfo } from 'os';
import { Comment, CommentSchema } from './comment.entity';


export type PostDocument = Post & Document;
@Schema({ timestamps: true })
export class Post  {

 
  _id?: Types.ObjectId;

  @Prop({ required: true }) 
  createdby?:Types.ObjectId

  @Prop({ required: true })
  title: string;

  @Prop({ required: true  })
  description: string;

@Prop({ type: Types.ArraySubdocument })
comments: Comment[];



}

export const PostSchema = SchemaFactory.createForClass(Post);
