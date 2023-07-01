import { Document } from 'mongoose';

export interface IRepository extends Document {
  readonly name: string;
  readonly gitlabUrl: string;
}
