import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly middleName: string;
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  readonly discordId: number;
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  readonly gitlabId: number;
}
