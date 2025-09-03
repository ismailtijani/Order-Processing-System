import { Meal } from '../../meal/models/meal.model';
import { BaseModel } from 'src/shared/base.model';

export class Addon extends BaseModel {
  static tableName = 'addons';

  meal_id!: string;
  amount!: number;
  quantity!: number;
  position?: number;
  is_combo!: boolean;
  meal_addon_id!: string;
  meal_addon_category_id!: string;
  internal_profit?: number;
  min_selection_no?: string;
  images?: Record<string, any>;
  posist_data?: Record<string, any>;
  meal_data?: {
    id: string;
    name: string;
    active: boolean;
    amount?: string;
    brand_id?: string;
    item_type?: string;
    new?: boolean;
  };

  static relationMappings = {
    meal: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: () => Meal,
      join: {
        from: 'addons.meal_id',
        to: 'meals.id',
      },
    },
  };
}
