import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  detail?: string;

  @IsString()
  @IsNotEmpty()
  project_id: string;

  @IsString()
  @IsNotEmpty()
  worker_user_id: string;

  @IsNumber()
  @IsNotEmpty()
  due_date: number;
}
