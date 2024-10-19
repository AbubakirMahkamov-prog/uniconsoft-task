import { IsString, IsNotEmpty } from 'class-validator';

export class AddRemoveUserDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  org_id: string;
}
