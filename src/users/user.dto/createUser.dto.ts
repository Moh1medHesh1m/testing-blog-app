import { IsEmail, IsNotEmpty ,isNotEmpty} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateUserDto {
 
_id:ObjectId
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}