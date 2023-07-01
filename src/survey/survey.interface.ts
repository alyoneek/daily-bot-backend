import { Document } from 'mongoose';

export interface ISurvey extends Document {
  readonly title: string;
  readonly chanelId: number | undefined;
  readonly type: 'day' | 'week';
  readonly time: string | null;
  readonly interval: number | null;
  readonly daysTime: IDaysTime | null;
  readonly questions: string[];
}

export interface IDaysTime {
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
}
