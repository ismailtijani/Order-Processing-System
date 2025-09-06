import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  meal_id: string;

  @IsString()
  @IsNotEmpty()
  addon_meal_id: string;

  @IsString()
  @IsNotEmpty()
  addon_category_id: string;

  @Type(() => Number)
  @IsNumber()
  addon_amount: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  default_quantity: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  position: number;

  @IsBoolean()
  is_combo: boolean;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  min_selection: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];
}
