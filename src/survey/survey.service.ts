import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { ISurvey } from './survey.interface';
import { Survey } from './survey.schema';

@Injectable()
export class SurveyService {
  constructor(@InjectModel(Survey.name) private surveyModel: Model<ISurvey>) {}

  async createSurvey(survey: CreateSurveyDto): Promise<ISurvey> {
    const newSurvey = await new this.surveyModel(survey);
    return newSurvey.save();
  }

  async createSurveysList(surveys: CreateSurveyDto[]): Promise<ISurvey[]> {
    return await this.surveyModel.insertMany(surveys);
  }

  async deleteSurveysList(surveysId: Schema.Types.ObjectId[]) {
    await this.surveyModel.deleteMany({ id: { $in: surveysId } });
  }
}
