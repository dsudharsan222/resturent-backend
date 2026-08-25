import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  id: string;

  @IsNumber()
  category_id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsEnum(['veg', 'non-veg'])
  type: 'veg' | 'non-veg';

  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;
}
