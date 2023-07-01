import { Document } from 'mongoose';

export interface IStudent extends Document {
  readonly lastName: string;
  readonly irstName: string;
  readonly middleName: string;
  readonly discordId: number;
  readonly gitlabId: number;
}
