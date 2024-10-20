import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrganizationDto {
  @ApiPropertyOptional({ description: 'Updated name of the organization', example: 'NewTechCorp' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'ID of the user who updated the organization', example: '67890' })
  @IsString()
  @IsOptional()
  created_by_id?: string;
}
