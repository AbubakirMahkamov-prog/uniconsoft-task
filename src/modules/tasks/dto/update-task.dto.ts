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

  @IsEnum(['CREATED', 'IN_PROCESS', 'DONE'])
  @IsNotEmpty()
  status: 'CREATED' | 'IN_PROCESS' | 'DONE';

  @IsString()
  @IsNotEmpty()
  created_by_id: string;

  @IsNumber()
  @IsNotEmpty()
  created_at: number;

  @IsNumber()
  @IsNotEmpty()
  due_date: number;
}
