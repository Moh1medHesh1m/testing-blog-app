import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { User } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';



@Controller('auth')

export class AuthController {
    constructor (

        private readonly authService:AuthService
    ){

            
        }

        
        @UseGuards(LocalAuthGuard)
        @Post('login')
         async login(@Req() req:Request){
            
            return  await this.authService.login(req.user as User)
            
         }

         @UseGuards(JwtAuthGuard)
         @Get('profile')
          userInfo(@Req() req:Request){ 
      
            return req.user
         }
        
    }
