import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Survey, SurveySchema } from 'src/survey/survey.schema';
import { SurveyService } from 'src/survey/survey.service';
import { GroupController } from './group.controller';
import { Group, GroupSchema } from './group.schema';
import { GroupService } from './group.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupSchema,
      },
      {
        name: Survey.name,
        schema: SurveySchema,
      },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService, SurveyService],
})
export class GroupModule {}
