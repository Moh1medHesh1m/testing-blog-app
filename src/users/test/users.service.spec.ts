
import { UserRepository } from '../users.repository';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from './../users.service';
import { TestingModule ,Test } from '@nestjs/testing';
import mongoose from 'mongoose';
describe('user service',()=>{

let service :UsersService
let repository :UserRepository
const mockObjectId = new mongoose.Types.ObjectId();
const stup  ={
  _id:mockObjectId,
  name:"h",
  email:"h@h.com",
  password:"1414"
}

let mockUserRepository ={
  create: jest.fn().mockImplementation(),
  findOne: jest.fn()

}
  beforeAll(async()=>{
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
        provide: UserRepository,
        useValue: mockUserRepository
      },
  
    
    ]
    }).compile();

    service = module.get<UsersService>(UsersService)
    repository = module.get<UserRepository>(UserRepository)
 
  });

  it("should be defined",()=>{
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })
  it("should create a user",  async ()=>{
    
    const expected =  await service.getUserByEmail(
   "email")
    const create = jest.spyOn(mockUserRepository,'findOne')
    expect(create).toBeCalled()
    expect( service.getUserByEmail(
      "email")).resolves.toEqual(stup)
     console.log( expected + "excpeeeeeeeeect")
    //  expect(expected).toEqual(stup)
 
   })

})