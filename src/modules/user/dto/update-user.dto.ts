import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  created_by_id?: string;

  @IsEnum(['admin', 'director', 'employee'])
  @IsOptional()
  role?: 'admin' | 'director' | 'employee';
}
