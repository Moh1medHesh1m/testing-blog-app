import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from 'src/users/schemas/user.schema';
import { UpdateUserDto } from 'src/users/user.dto/updateUser.dto';
import { DatabaseService } from '../src/database/databaseService';
import { Connection } from 'mongoose';

describe('Users Controller (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let connection : Connection
  

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = moduleFixture
        .get<DatabaseService>(DatabaseService)
        .getDbHandle();
  });

  it('/create user', async () => {
    const user: User = {
      email: 'momo@mom.com',
      password: '1234',
      name: 'momo',
    };
    const { body } = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        ...user,
      })
      .expect(201);
  });

  it('should login', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'momo@mom.com',
        password: '1234',
      });
    token = body.access_token;
    console.log('tokeeeen \n' + token);
  });
  it('should update user', async () => {
    const user: UpdateUserDto = {
      email: 'meme@meme.com',
      name: 'meoooo',
    };
    const { body } = await request(app.getHttpServer())
      .patch('/users/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...user,
      })
      .expect(200);
  });
  
  it('should return user data', async () => {
    console.log(token);
    const { body } = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
   
  });
  afterAll( async () => {
    await  app.close()
    
  });
});
