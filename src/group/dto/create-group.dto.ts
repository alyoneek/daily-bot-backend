import { IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import { CreateSurveyDto } from 'src/survey/dto/create-survey.dto';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  readonly users: Schema.Types.ObjectId[];
  readonly surveys: CreateSurveyDto[];
}
