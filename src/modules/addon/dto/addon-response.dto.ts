import { Expose, Type } from 'class-transformer';
import { AddonCategoryResponseDto } from './addon-category-response.dto';
import { MealResponseDto } from 'src/modules/meal/dto/meal-response.dto';

export class AddonResponseDto {
  @Expose()
  id: string;

  @Expose()
  addon_amount: number;

  @Expose()
  min_selection: number;

  @Expose()
  default_quantity: number;

  @Expose()
  position: number;

  // The actual addon meal details
  @Expose()
  @Type(() => MealResponseDto)
  addon_meal: MealResponseDto;
  //   addon_meal: {
  //     id: string;
  //     name: string;
  //     amount: number; // Base price if ordered separately
  //     description?: string;
  //     images?: string[];
  //   };

  @Expose()
  @Type(() => AddonCategoryResponseDto)
  category: AddonCategoryResponseDto;
}
