import { IsString, IsOptional, IsEmail, IsObject } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  phone_reservations?: string;

  @IsOptional()
  @IsString()
  phone_catering?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  timings?: string;

  @IsOptional()
  @IsObject()
  address?: any;

  @IsOptional()
  @IsObject()
  social_media?: any;
}
