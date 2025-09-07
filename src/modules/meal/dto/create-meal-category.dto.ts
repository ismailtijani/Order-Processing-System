import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMealCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  brand_id: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  position: number;

  @IsOptional()
  @IsString()
  image: string;
}
