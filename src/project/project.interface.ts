import { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  readonly name: string;
  readonly groups: Schema.Types.ObjectId[];
  readonly users: Schema.Types.ObjectId[];
  readonly reposritories: Schema.Types.ObjectId[];
}
