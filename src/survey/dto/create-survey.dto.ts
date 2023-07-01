import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IDaysTime } from '../survey.interface';

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  readonly chanelId: number;
  @IsString()
  @IsNotEmpty()
  @IsIn(['day', 'week'])
  readonly type: string;
  @IsString()
  @IsOptional()
  readonly time: string;
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly interval: number;
  @IsOptional()
  readonly daysTime: IDaysTime;
  @IsOptional()
  readonly questions: string[];
}
