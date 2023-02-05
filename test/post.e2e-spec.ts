import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreatePostDto } from '../src/post/dto/create-post.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
    let token
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should login', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'meme@meme.com',
        password: '1234',
      });
    token = body.access_token;
    console.log('tokeeeen \n' + token);
  });

  it('should create post',async ()=>{
    const dto:CreatePostDto = {
        description:"nour",
        title:'ana nour'
    }
    const { body } = await request(app.getHttpServer())
      .post('/post/create').set('Authorization', `Bearer ${token}`)
      .send({
        ...dto
      });
  })
  afterAll(async ()=>{
   await app.close()
  })
});
