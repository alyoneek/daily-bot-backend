import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IDaysTime } from './survey.interface';
@Schema()
export class Survey {
  @Prop()
  title: string;
  @Prop()
  chanelId: number;
  @Prop()
  type: 'day' | 'week';
  @Prop()
  time: string | null;
  @Prop()
  interval: number | null;
  @Prop({ type: Object })
  daysTime: IDaysTime | null;
  @Prop()
  questions: string[];
}
export const SurveySchema = SchemaFactory.createForClass(Survey);
