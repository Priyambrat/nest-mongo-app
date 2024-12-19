import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateEmployeeDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly designation: string;
  @IsNotEmpty()
  readonly department: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly gender: string;
  @IsNumber()
  @IsNotEmpty()
  readonly salary: number;
}
