import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  admin: boolean;
}
