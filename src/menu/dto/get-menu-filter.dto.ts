import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class GetMenuFilterDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBooleanString()
  isFeatured?: string;
}
