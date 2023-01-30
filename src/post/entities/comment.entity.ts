import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document, Types } from 'mongoose';


export type     CommentDocument = Comment & Document;
@Schema({ timestamps: true })
export class Comment  {

 
  _id?: Types.ObjectId;

 @Prop()
 createdby?:Types.ObjectId
  


 @Prop()
  commentBody?: string;


}

export const CommentSchema = SchemaFactory.createForClass(Comment);
