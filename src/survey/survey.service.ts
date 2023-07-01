import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
