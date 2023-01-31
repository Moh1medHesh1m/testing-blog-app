import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UserRepository } from '../users.repository';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository
const mockUserRepository= ()=>{
 create: jest.fn().mockImplementation()
}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide: UserRepository ,
        useFactory: mockUserRepository
      },
      
    ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(UserRepository)
  });

  it('should be defined', () => {
    expect(service.createUser).toBeDefined();
  });
});
