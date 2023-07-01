import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Repository {
  @Prop()
  name: string;
  @Prop()
  gitlabUrl: string;
}
export const RepositorySchema = SchemaFactory.createForClass(Repository);
