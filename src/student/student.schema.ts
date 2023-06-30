import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Student {
  @Prop()
  lastName: string;
  @Prop()
  firstName: string;
  @Prop()
  middleName: string;
  @Prop()
  discordId: number;
  @Prop()
  gitlabId: number;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
