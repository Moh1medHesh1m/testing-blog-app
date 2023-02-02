import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './databaseService';
@Module({
    imports:[
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            // uri: configService.get<string>('mongo.uri'),

            uri:
              configService.get<string>('NODE_ENV') === 'test'
            ? configService.get<string>('MONGO_TEST.uri')
            : configService.get<string>('mongo.uri'),
          }),
          inject: [ConfigService],
   
          })
    ],
    providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}