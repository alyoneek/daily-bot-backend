import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RepositoryService } from 'src/repository/repository.service';

import { Group, GroupSchema } from 'src/group/group.schema';
import { GroupService } from 'src/group/group.service';
import { Repository, RepositorySchema } from 'src/repository/repository.schema';
import { Survey, SurveySchema } from 'src/survey/survey.schema';
import { SurveyService } from 'src/survey/survey.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
        name: Group.name,
        schema: GroupSchema,
      },
      {
        name: Survey.name,
        schema: SurveySchema,
      },
      {
        name: Repository.name,
        schema: RepositorySchema,
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, GroupService, RepositoryService, SurveyService],
})
export class ProjectModule {}
