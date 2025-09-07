import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItemType, MealTag } from 'src/shared/enums/enum';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand_id: string;

  @Type(() => Number)
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsBoolean()
  new: boolean;

  @IsOptional()
  @IsBoolean()
  alcohol: boolean;

  @IsOptional()
  @IsBoolean()
  is_addon: boolean;

  @IsOptional()
  @IsBoolean()
  is_combo: boolean;

  @IsNumber()
  @IsOptional()
  position: number;

  @IsOptional()
  @IsBoolean()
  home_page: boolean;

  @IsEnum(ItemType)
  @IsNotEmpty()
  item_type: ItemType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  calories: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minimum_age: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  available_number: number;

  @IsString()
  @IsOptional()
  meal_category_id: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(MealTag, { each: true })
  meal_tags: MealTag[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  meal_keywords: string[];

  @IsString()
  @IsOptional()
  summary: string;
}
