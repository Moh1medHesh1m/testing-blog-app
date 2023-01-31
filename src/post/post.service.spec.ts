import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/users/users.repository';
import { PostDocument } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
 let repository : PostRepository
  const stup =[
    {
      createdby : "63d674f686c19462137d3d27",
      title: "i am legend",
       description: "i am writing this articale to me",
      
    
      createdAt: "2023-01-30T08:55:53.478Z",
      updatedAt : "2023-01-30T09:48:44.176Z",
       __v: 0,
       comments: []}
  ]

  const postMockRepository = ()=>(
    
    {
    find: jest.fn().mockImplementation(() => stup)
  }
  
  
  )
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService,{
        provide: PostRepository,
        useFactory: postMockRepository
      }],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get(PostRepository)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated posts', async ()=>{
    // spy on on mocked repository
    const spy = jest.spyOn(repository, 'find');
  //  await expect(await service.paginatePosts(0,0)).resolves.toStrictEqual(stup)
    const expected = await service.paginatePosts(0,0);

    expect(expected).toEqual(stup);

  })
});
