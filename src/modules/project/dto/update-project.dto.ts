import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;
    
  @IsString()
  @IsOptional()
  org_id?: string;
  
  @IsString()
  @IsOptional()
  created_by_id?: string;
}
