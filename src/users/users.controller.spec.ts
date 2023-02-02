import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let UserRepository: UserRepository
  let service : UsersService


  const mockObjectId = new mongoose.Types.ObjectId();
// we mock the service here
const user: User ={_id:mockObjectId,name:"HESAHM", email:"HESHAM@GH.COM",password:"1234"}

const mockUserService = {
  createUser: jest.fn().mockImplementation(()=>Promise.resolve(user)),
  findonebyid: jest.fn().mockImplementation(()=>Promise.resolve(user)),
  updateUser: jest.fn().mockImplementation(()=>Promise.resolve(user))

}


const req = {
  user
}
  // Simulating the module in user.module
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide: UsersService
          ,
          useValue:mockUserService
        }]
      
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    it('should create user',()=>{
      const spy = jest.spyOn(mockUserService,"createUser")  
      expect(controller.create(user )).resolves.toEqual(user)
           expect(spy).toBeCalled()
    })
   
    it('should get user',()=>{
      const spy = jest.spyOn(mockUserService,'findonebyid')
      expect(controller.getUser('id')).resolves.toEqual(user)
      expect(spy).toBeCalled()
    })

    it('should update user',()=>{
      expect(controller.update(req,{name:"mo",email:"momo"})).resolves.toEqual(user)
    })
});
