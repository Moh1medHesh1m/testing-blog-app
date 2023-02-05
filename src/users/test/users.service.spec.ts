
import { UserRepository } from '../users.repository';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from './../users.service';
import { TestingModule ,Test } from '@nestjs/testing';
import mongoose, { ObjectId } from 'mongoose';
import { async } from 'rxjs';
describe('user service',()=>{

let service :UsersService
let repository :UserRepository
const mockObjectId = new mongoose.Types.ObjectId();
const stup :User ={
  // _id:mockObjectId,
  name:"h",
  email:"h@h.com",
  password:"1414"
}
const id :ObjectId = "507f191e810c19729de860ea" as unknown as ObjectId
let mockUserRepository ={
  create: jest.fn().mockImplementation(()=>stup),
  findOne: jest.fn().mockImplementation((_id:'1243')=>stup),
  findOneAndUpdate: jest.fn().mockImplementation(()=>stup)

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
    
    const expected =  await service.createUser({
      name:"h",
      email:"h@h.com",
    password:"1414"    })
    const create = jest.spyOn(mockUserRepository,'create')
    expect(create).toBeCalled()
    expect( expected).toEqual(stup)
     console.log( expected + "excpeeeeeeeeect")
    //  expect(expected).toEqual(stup)
 
   })

   it('should update user',async ()=>{

    const expected = await service.updateUser(id,{
      name:"h",
      email:"h@ho.com"
    })
    const findOneAndUpdate = jest.spyOn(mockUserRepository, 'findOneAndUpdate')
    expect(findOneAndUpdate).toBeCalled()
    expect(expected).toStrictEqual(stup)

   })

   it('should get user by email',async()=>{
    const expected = await service.getUserByEmail('hesham@h.com')
    const findOne = jest.spyOn(mockUserRepository,'findOne')
    expect(findOne).toBeCalled()
    expect(expected).toEqual(stup)
   })

})