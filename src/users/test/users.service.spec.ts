import { EntityRepository } from 'src/database/entity.repository';
import { UserRepository } from 'src/users/users.repository';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from './../users.service';
import { TestingModule ,Test } from '@nestjs/testing';
describe('user service',()=>{

let service :UsersService
let repository :UserRepository



let mockUserRepository ={}
let mockEntityRepository ={}
  beforeEach(async()=>{
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
        provide: UserRepository,
        useValue: mockUserRepository
      },
      {
        provide:EntityRepository,
        useValue: mockEntityRepository
      }
    
    ],
    }).compile();

    service = module.get<UsersService>(UsersService)
    repository = module.get<UserRepository>(UserRepository)

  })

  it("should be defined",()=>{
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })
})