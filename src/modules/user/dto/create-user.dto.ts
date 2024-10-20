import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user', example: 'Abubakir' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'ID of the creator', example: 'asdasda' })
  @IsString()
  @IsOptional() // Optional since it may not always be provided
  created_by_id?: string;

  @ApiProperty({ description: 'Role of the user', example: 'admin', enum: ['admin', 'director', 'employee'] })
  @IsEnum(['admin', 'director', 'employee'])
  @IsNotEmpty()
  role: 'admin' | 'director' | 'employee';
}
