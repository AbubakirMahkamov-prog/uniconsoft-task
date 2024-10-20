import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRemoveUserDto {
  @ApiProperty({ description: 'The ID of the user to be added or removed', example: 'abc123' })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ description: 'The ID of the organization', example: 'org789' })
  @IsString()
  @IsNotEmpty()
  org_id: string;
}
