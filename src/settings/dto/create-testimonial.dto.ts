import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}
