import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  const mockObjectId = new mongoose.Types.ObjectId();
  // const user: User ={_id:mockObjectId,name:"HESAHM", email:"HESHAM@GH.COM",password:"1234"}
  const stub = {
    _id:mockObjectId,
    createdby:mockObjectId,
    title:"",
    description:"",
    comments:[]
  }

  const user = {
    id:mockObjectId
  }
  const req = {
    user
  }
  const mockPostService= {
    create: jest.fn().mockImplementation(()=>Promise.resolve(stub)),
    comment: jest.fn().mockImplementation(()=>Promise.resolve(stub)),
    findOne: jest.fn().mockImplementation(()=>Promise.resolve("hi"))
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).overrideProvider(PostService).useValue(mockPostService).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create post',()=>{
    const spy = jest.spyOn(mockPostService,"create") 
    expect(controller.create({description:"hi",title:"hello"},req)).resolves.toEqual(stub)
    expect(spy).toBeCalled()
  })

  it('should create comment',()=>{
    const spy = jest.spyOn(mockPostService,"comment")
    expect(controller.comments({commentBody:"hi"},req,"2")).resolves.toEqual(stub)
    expect(spy).toBeCalled()
  })

  it('should return string',()=>{
    const spy = jest.spyOn(mockPostService,"findOne")
    expect(controller.findOne("sad")).resolves.toEqual("hi")
    expect(spy).toBeCalled()
  })


});
