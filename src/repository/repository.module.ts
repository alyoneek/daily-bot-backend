import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Repository, RepositorySchema } from './repository.schema';
import { RepositoryService } from './repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Repository.name,
        schema: RepositorySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [RepositoryService],
})
export class RepositoryModule {}
