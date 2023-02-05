import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../app.module";
import { User } from "src/users/schemas/user.schema";
import { CreateUserDto } from "src/users/user.dto/createUser.dto";
import { UsersService } from "../../users.service";
import { INestApplication } from "@nestjs/common";
import { AuthService } from "../../../auth/auth.service";
import { UpdateUserDto } from "src/users/user.dto/updateUser.dto";
import { ObjectId } from "mongoose";
describe('user service',()=>{
    let service : UsersService
    let app : INestApplication
    let auth:AuthService
    let createdUser:User 
      beforeAll(async()=>{
        const module: TestingModule = await Test.createTestingModule({
          imports:[AppModule]
            
      
        
        
        }).compile();
        app = module.createNestApplication()
        await app.init() 
        service =  module.get<UsersService>(UsersService)
        auth = module.get<AuthService>(AuthService)
     
      });
    it('should create user ', async ()=>{
        const createUserDto:CreateUserDto ={
            name:"hesham",
            email:"hesham@hesham.com",
            password:'qwerty'

        }
        const expected = await service.createUser(createUserDto)
        console.log(expected)
        createdUser= expected
    })

    it('should be defined',()=>{
        expect(service).toBeDefined()
    })

    it('should login user', async ()=>{
        const expected  =  await auth.login({
            email:"hesham@hesham.com",
            name:"hesham",
            password:'qwerty'
        })
        console.log(expected)
    })
    it('should update user',async()=>{
        const updatedDto :UpdateUserDto = {
            email:'hees@hee.com',
            name:'hehe'
        }
        const id  = createdUser._id
        const expected = await service.updateUser( Object( id),updatedDto)
        console.log(expected)
    })



    afterAll(async ( )=>{
       await app.close()
    })
})
