import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
        MongooseModule.forRootAsync({
            useFactory: () => ({
              uri: 'mongodb+srv://mohamed-hesham:123@cluster0.nulomd6.mongodb.net/?retryWrites=true&w=majority',
            }),
          })
    ]
})
export class DatabaseModule {}