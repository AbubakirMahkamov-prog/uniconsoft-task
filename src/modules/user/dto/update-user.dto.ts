import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Name of the user', example: 'Abubakir' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'ID of the creator', example: 'asdasda' })
  @IsString()
  @IsOptional()
  created_by_id?: string;

  @ApiPropertyOptional({ description: 'Role of the user', example: 'admin', enum: ['admin', 'director', 'employee'] })
  @IsEnum(['admin', 'director', 'employee'])
  @IsOptional()
  role?: 'admin' | 'director' | 'employee';
}
