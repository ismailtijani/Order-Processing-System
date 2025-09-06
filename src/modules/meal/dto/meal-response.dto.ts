import { Expose, Type } from 'class-transformer';
import { BrandResponseDto } from 'src/modules/brand/dto/brand-response.dto';
import { ItemType, MealTag } from 'src/shared/enum';
import { MealCategoryResponseDto } from './meal-category-response.dto';
import { AddonResponseDto } from 'src/modules/addon/dto/addon-response.dto';

export class MealResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  brand_id: string;

  @Expose()
  amount: number;

  @Expose()
  description: string;

  @Expose()
  active: boolean;

  @Expose()
  new: boolean;

  @Expose()
  alcohol: boolean;

  @Expose()
  is_addon: boolean;

  @Expose()
  is_combo: boolean;

  @Expose()
  position: number;

  @Expose()
  home_page: boolean;

  @Expose()
  item_type: ItemType;

  @Expose()
  calories: number;

  @Expose()
  minimum_age: number;

  @Expose()
  available_number: number;

  @Expose()
  internal_profit: number;

  @Expose()
  meal_category_id: string;

  @Expose()
  images: string[];

  @Expose()
  meal_tags: MealTag[];

  @Expose()
  meal_keywords: string[];

  @Expose()
  posist_data: Record<string, any>;

  @Expose()
  summary: string;

  @Expose()
  @Type(() => BrandResponseDto)
  brand: BrandResponseDto;

  @Expose()
  @Type(() => MealCategoryResponseDto)
  category: MealCategoryResponseDto;

  @Type(() => AddonResponseDto)
  available_addons: AddonResponseDto[];

  @Expose()
  is_deleted: boolean;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
