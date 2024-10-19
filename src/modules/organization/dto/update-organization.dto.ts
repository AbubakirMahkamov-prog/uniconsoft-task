import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrganizationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  created_by_id?: string;
}
