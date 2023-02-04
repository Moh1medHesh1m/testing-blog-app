import { AuthService } from './../auth.service';
import { JWT_SECRET } from './../constant';
import { UsersService } from './../../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService: UsersService,
        private readonly authService: AuthService
        ){
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration:false,
                secretOrKey:JWT_SECRET
            }
        );
    }

    async validate(validationPayload:{email:string, getUserByEmail(email:string)}){
        console.log(validationPayload.email)
        return await this.userService.getUserByEmail(validationPayload.email)
    }
    // async validate(payload: any) {
    //     return { userId: payload.sub, username: payload.username };
    //   }

    // async validate(payload: any ): Promise<User> {
    //     const { sub } = payload
        
    //     console.log(payload.sub+"lol")

    //     const user = await this.authService.validateUser(sub)
      
    //     if (!user) {
    //       throw new UnauthorizedException()
    //     }
      
    //     return user
    //   }
    // // }
    // async validate(payload: any) {

    //     const user = await this.authService.validateUser(payload.sub);
    
    //     if (!user) {
    //       throw new UnauthorizedException();
    //     }
    //     return user;
    //   }
}
