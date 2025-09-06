import { Model } from 'objection';
import { Meal } from '../../meal/models/meal.model';
import { BaseModel } from 'src/shared/base.model';
import { AddonCategory } from 'src/modules/addon-category.model';

export class Addon extends BaseModel {
  static tableName = 'addons';

  meal_id!: string;
  addon_meal_id!: string;
  addon_category_id!: string;
  addon_amount!: number;

  default_quantity?: number;
  position?: number;
  is_combo!: boolean;
  internal_profit?: number;
  min_selection?: number;
  images?: string[];
  posist_data?: Record<string, any>;

  static relationMappings = {
    mainMeal: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Meal,
      join: { from: 'addons.meal_id', to: 'meals.id' },
    },
    addonMeal: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Meal,
      join: { from: 'addons.addon_meal_id', to: 'meals.id' },
    },
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => AddonCategory,
      join: {
        from: 'addons.addon_category_id',
        to: 'addon_categories.id',
      },
    },
  };
}
