import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Name of the project', example: 'Project Alpha' })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ description: 'ID of the organization the project belongs to', example: 'org123' })
  @IsString()
  @IsNotEmpty()
  org_id: string;

  @ApiProperty({ description: 'ID of the user who created the project', example: 'user456' })
  @IsString()
  @IsNotEmpty()
  created_by_id: string;
}
