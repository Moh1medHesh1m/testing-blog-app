import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Connection } from "mongoose";
import { AppModule } from "src/app.module";
import { AuthService } from "src/auth/auth.service";
import { DatabaseService } from "src/database/databaseService";
import { testUser } from "src/users/test/stubs/users.stubs";

export class IntegrationTestManager {
    public httpServer: any;
  
    private app: INestApplication;
    private accessToken: any;
    private connection: Connection;

  
    async beforeAll(): Promise<void> {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile(); 



      this.app = moduleRef.createNestApplication();
      await this.app.init();
      this.httpServer = this.app.getHttpServer();
  
      const authService = this.app.get<AuthService>(AuthService);
      this.connection = moduleRef
        .get<DatabaseService>(DatabaseService)
        .getDbHandle();

        const userId = await this.connection.collection('users').findOne({email:testUser.email})


      this.accessToken = await authService.login({
        email:testUser.email,
        name:testUser.name,
        password:testUser.password,

      })    
    }
async afterAll(){
  this.app.close( )
}
getCollection(collectionName:string){
  return this.connection.collection(collectionName)
} 

getAccessToken():string{
  return this.accessToken
}
    
}