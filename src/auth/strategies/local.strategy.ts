import { AuthService } from './../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor( 
        private readonly authService:AuthService
    ){
        super();
    }

     validate(username:string,password:string){
        const user = this.authService.validate(username,password)
        if(!user){
           console.log("unauthorized sad" )
        }
        return user
     }
}