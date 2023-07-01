import { IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { CreateRepositoryDto } from 'src/repository/dto/create-repository.dto';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  readonly groups: CreateGroupDto[];
  readonly users: Schema.Types.ObjectId[];
  readonly repositories: CreateRepositoryDto[];
}
