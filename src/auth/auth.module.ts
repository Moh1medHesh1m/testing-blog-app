import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from './constant';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[
    UsersModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:JWT_SECRET,
      signOptions:{expiresIn:'3600s'}
    })
  
  ],
  controllers:[AuthController],

  providers: [AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {

  
}
