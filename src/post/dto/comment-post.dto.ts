import { IsString } from "class-validator"

export class CommentPostDto {
    
    @IsString()
    commentBody:string
}
