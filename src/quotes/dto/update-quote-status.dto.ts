import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateQuoteStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
