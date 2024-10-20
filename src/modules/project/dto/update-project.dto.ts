import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({ description: 'Updated name of the project', example: 'Project Beta' })
  @IsString()
  @IsOptional()
  name?: string;
    
  @ApiPropertyOptional({ description: 'Updated organization ID the project belongs to', example: 'org789' })
  @IsString()
  @IsOptional()
  org_id?: string;
  
  @ApiPropertyOptional({ description: 'ID of the user who updated the project', example: 'user123' })
  @IsString()
  @IsOptional()
  created_by_id?: string;
}
