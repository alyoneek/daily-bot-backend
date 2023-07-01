import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Group } from 'src/group/group.schema';
import { Repository } from 'src/repository/repository.schema';
import { Student } from 'src/student/student.schema';

@Schema()
export class Project {
  @Prop()
  name: string;
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Group.name, default: [] })
  groups: MongooseSchema.Types.ObjectId[];
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Student.name,
    default: [],
  })
  users: MongooseSchema.Types.ObjectId[];
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Repository.name,
    default: [],
  })
  repositories: MongooseSchema.Types.ObjectId[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
