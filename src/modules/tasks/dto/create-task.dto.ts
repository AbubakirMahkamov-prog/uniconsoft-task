import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The name of the task', example: "Printing inventory" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Details of the task', required: false, example: "Bla bla" })
  @IsString()
  @IsOptional()
  detail?: string;

  @ApiProperty({ description: 'The ID of the project', example: 'asdas' })
  @IsString()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({ description: 'The ID of the worker user', example: 'asddfa' })
  @IsString()
  @IsNotEmpty()
  worker_user_id: string;

  @ApiProperty({ description: 'The ID of the user who created the task', example: "asdsd" , required: false })
  @IsString()
  @IsOptional()
  created_by_id?: string;

  @ApiProperty({ description: 'The due date as a timestamp', example: 1729405922 })
  @IsNumber()
  @IsNotEmpty()
  due_date: number;
}
