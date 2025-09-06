import { Brand } from '../../brand/models/brand.model';
import { Addon } from '../../addon/models/addon.model';
import { BaseModel } from 'src/shared/base.model';
import { Model, RelationMappings } from 'objection';
import { MealOrder } from 'src/modules/meal-order.model';
import { ItemType, MealTag } from 'src/shared/enum';
import { MealCategory } from 'src/modules/meal-category.model';

export class Meal extends BaseModel {
  static tableName = 'meals';

  name!: string;
  brand_id!: string;
  meal_category_id?: string;
  amount!: number;
  active!: boolean;
  available_number?: number;
  description?: string;
  new!: boolean;
  alcohol!: boolean;
  is_addon!: boolean;
  is_combo!: boolean;
  position?: number;
  home_page!: boolean;
  item_type!: ItemType;
  calories?: number;
  minimum_age?: number;
  internal_profit?: number;
  images?: string[];
  meal_tags?: MealTag[];
  meal_keywords?: string[];
  summary?: string;
  is_deleted!: boolean;
  posist_data?: Record<string, any>;

  static relationMappings: RelationMappings = {
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Brand,
      join: {
        from: 'meals.brand_id',
        to: 'brands.id',
      },
    },
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => MealCategory,
      join: { from: 'meals.meal_category_id', to: 'meal_categories.id' },
    },
    addons: {
      relation: Model.HasManyRelation,
      modelClass: () => Addon,
      join: {
        from: 'meals.id',
        to: 'addons.meal_id',
      },
    },
    mealOrders: {
      relation: Model.HasManyRelation,
      modelClass: () => MealOrder,
      join: {
        from: 'meals.id',
        to: 'meal_orders.meal_id',
      },
    },
  };
}
