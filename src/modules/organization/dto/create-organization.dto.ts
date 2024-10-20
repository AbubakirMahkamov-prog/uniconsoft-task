import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ description: 'Name of the organization', example: 'TechCorp' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'ID of the user who created the organization', example: '12345' })
  @IsString()
  @IsOptional() // Optional since it may not always be provided
  created_by_id?: string;
}
