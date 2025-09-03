import { Brand } from '../../brand/models/brand.model';
import { Addon } from '../../addon/models/addon.model';
// import { CalculatedOrder } from '../../calculated-order/models/calculated-order.model';
import { BaseModel } from 'src/shared/base.model';

export class Meal extends BaseModel {
  static tableName = 'meals';

  name!: string;
  brand_id!: string;
  amount!: string;
  description?: string;
  active!: boolean;
  new!: boolean;
  alcohol!: boolean;
  is_addon!: boolean;
  is_combo!: boolean;
  position?: number;
  home_page!: boolean;
  item_type!: string;
  calories?: string;
  minimum_age?: string;
  available_no?: string;
  internal_profit?: number;
  meal_category_id?: string;
  images?: string[];
  meal_tags?: string[];
  meal_keywords?: string[];
  posist_data?: Record<string, any>;
  is_deleted!: boolean;
  item_no?: string;
  summary?: string;

  static relationMappings = {
    brand: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: () => Brand,
      join: {
        from: 'meals.brand_id',
        to: 'brands.id',
      },
    },
    addons: {
      relation: BaseModel.HasManyRelation,
      modelClass: () => Addon,
      join: {
        from: 'meals.id',
        to: 'addons.meal_id',
      },
    },
    mealOrders: {
      relation: BaseModel.HasManyRelation,
      modelClass: () => Meal,
      join: {
        from: 'meals.id',
        to: 'meal_orders.meal_id', //check here
      },
    },
  };
}
