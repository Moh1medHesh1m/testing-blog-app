import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database/database.module';
// import { DatabaseModule } from 'src/database/database.module';

@Module({

    imports : [
      DatabaseModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
      
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
