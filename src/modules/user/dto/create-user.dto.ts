// src/modules/user/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional() // Optional since it may not always be provided
  created_by_id?: string;

  @IsEnum(['admin', 'director', 'employee'])
  @IsNotEmpty()
  role: 'admin' | 'director' | 'employee';
}
