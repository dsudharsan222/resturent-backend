import { IsString, IsEmail, IsDateString, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsOptional()
  event_type_id?: string;

  @IsString()
  @IsOptional()
  guest_count_id?: string;

  @IsString()
  @IsOptional()
  food_preference_id?: string;

  @IsString()
  customer_name: string;

  @IsString()
  customer_phone: string;

  @IsEmail()
  customer_email: string;

  @IsDateString()
  event_date: string;

  @IsOptional()
  selected_items?: any;
}
