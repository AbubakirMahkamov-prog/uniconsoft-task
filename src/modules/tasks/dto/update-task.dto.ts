import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ description: 'The name of the task', required: false, example: "Printing inventory" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Details of the task', required: false, example: "Bla bla" })
  @IsString()
  @IsOptional()
  detail?: string;

  @ApiProperty({ description: 'The ID of the project', required: false, example: 'asdas' })
  @IsString()
  @IsOptional()
  project_id?: string;

  @ApiProperty({ description: 'The ID of the worker user', required: false, example: 'asdas' })
  @IsString()
  @IsOptional()
  worker_user_id?: string;

  @ApiProperty({ description: 'The due date as a timestamp', required: false, example: 1729405922 })
  @IsNumber()
  @IsOptional()
  due_date?: number;
}
