import { IsString, IsOptional, isString } from 'class-validator';
import { Type } from 'class-transformer';
import { ArrayMinSize, isArray, isNotEmpty, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongoose';
export class SearchIds{
    @IsString()
    id:ObjectId
 
}


export class SearchForMultiplePosts{
   
//   @ValidateNested({ each: true })
  @ArrayMinSize(1)
@ValidateNested({ each: true })
  @Type(() => SearchIds)
    posts:SearchIds[]

    @IsOptional()
    name:string
}