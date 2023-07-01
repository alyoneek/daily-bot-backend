import { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
  readonly name: string;
  readonly users: Schema.Types.ObjectId[];
  readonly surveys: Schema.Types.ObjectId[];
}
