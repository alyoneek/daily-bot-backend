import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SurveyService } from 'src/survey/survey.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { IGroup } from './group.interface';
import { Group } from './group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<IGroup>,
    private surveyService: SurveyService,
  ) {}

  async createGroup(group: CreateGroupDto): Promise<IGroup> {
    const { surveys } = group;

    const addedSurveys = await this.surveyService.createSurveysList(surveys);

    const newGroup = {
      ...group,
      surveys: addedSurveys.map((survey) => survey._id),
    };

    return this.groupModel.create(newGroup);
  }

  async createGroupsList(groups: CreateGroupDto[]): Promise<IGroup[]> {
    return await Promise.all(
      groups.map(async (group) => await this.createGroup(group)),
    );
  }

  async getGroup(groupId: string): Promise<IGroup> {
    const existingGroup = await this.groupModel
      .findById(groupId)
      .populate({ path: 'users', select: '_id lastName firstName middleName' })
      .populate('surveys')
      .exec();
    if (!existingGroup) {
      throw new NotFoundException(`Group #${groupId} not found`);
    }
    return existingGroup;
  }

  async updateGroup(groupId: string, group: UpdateGroupDto): Promise<IGroup> {
    const existingGroup = await this.groupModel.findById(groupId);
    if (!existingGroup) {
      throw new NotFoundException(`Group #${groupId} not found`);
    }

    const { surveys: deletedSurveys } = existingGroup;
    const { surveys: createdSurveys } = group;

    await this.surveyService.deleteSurveysList(deletedSurveys);
    const addedSurveys = await this.surveyService.createSurveysList(
      createdSurveys,
    );

    const newGroup = {
      ...group,
      surveys: addedSurveys.map((survey) => survey._id),
    };

    return await this.groupModel.findByIdAndUpdate(groupId, newGroup, {
      new: true,
    });
  }

  async deleteGroup(groupId: string): Promise<IGroup> {
    const deletedGroup = await this.groupModel.findByIdAndDelete(groupId);
    if (!deletedGroup) {
      throw new NotFoundException(`Group #${groupId} not found`);
    }
    return deletedGroup;
  }
}
