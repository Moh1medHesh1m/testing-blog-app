import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';

import configurations from './config/configuration';


@Module({
  
  imports: [  
    ConfigModule.forRoot({
      load: [configurations],
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    PostModule,
    
  ],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}
