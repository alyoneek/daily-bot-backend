import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Student } from 'src/student/student.schema';
import { Survey } from 'src/survey/survey.schema';

@Schema()
export class Group {
  @Prop()
  name: string;
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Student.name,
    default: [],
  })
  users: MongooseSchema.Types.ObjectId[];
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Survey.name })
  surveys: MongooseSchema.Types.ObjectId[];
}
export const GroupSchema = SchemaFactory.createForClass(Group);
