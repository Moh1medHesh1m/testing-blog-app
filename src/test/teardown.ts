import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { DatabaseService } from '../database/databaseService';

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  const databaseService = moduleRef.get<DatabaseService>(DatabaseService);
  
  await databaseService.getDbHandle().dropDatabase();
  console.log('tearrdown')

  await app.close();
};