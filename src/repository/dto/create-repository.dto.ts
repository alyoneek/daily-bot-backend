import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly gitlabUrl: string;
}
