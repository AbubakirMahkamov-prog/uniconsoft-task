import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  org_id: string;

  @IsString()
  @IsOptional() // Optional since it may not always be provided
  created_by_id?: string;
}
