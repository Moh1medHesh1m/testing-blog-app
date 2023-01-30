import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/schemas/user.schema';
import { JWT_SECRET } from './constant';


@Injectable()
export class AuthService {

    constructor(
        private readonly userservice:UsersService,
        private readonly jwtservice :JwtService

    ){}
        async validate (username : string , password:string){
            
            const user = await this.userservice.getUserByEmail(username)
            // console.log(user)
            if(!user){
                console.log("!user")
                return null
            }
            const passwordIsValid = await bcrypt.compare(password, user.password)
            // console.log(passwordIsValid+"da password")
            if(passwordIsValid){
                const { password, ...result } = user;
                // console.log(user +"hee")
                return user;
                
            }
            return null
        }

    async login (user:User){
        const payload = {
            username: user.name,
            email: user.email,
            // sub: user._id
        }
        console.log(payload)
        
        return {
            access_token: this.jwtservice.sign(payload)
        }
    

    }

    async verify(token:string):Promise<User>{
        console.log("token not")
        const decoded = this.jwtservice.verify(token,{
            secret:JWT_SECRET
        })
        console.log(decoded)
        const user = this.userservice.getUserByEmail(decoded.username)

        if(!user)
        {
            throw new Error ("unable to get the user from decoded token")
        }
        return user
    }

    // async validateUser(payload:any): Promise<User> {
    //    const {sub}= payload
    //    console.log(payload.sub+"aho")
    //     const user = await this.userservice.findonebyid(sub);
    //     if (!user) return null;
    
    //     const { _id, name, email} = user;
    //     // return { _id, email, name} as User;
    //   }

}
