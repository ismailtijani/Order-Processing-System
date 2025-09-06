import { Model, RelationMappings } from 'objection';
import { MealOrder } from './meal-order.model';
import { BaseModel } from 'src/shared/base.model';
import { Meal } from './meal/models/meal.model';

export class MealOrderAddon extends BaseModel {
  static tableName = 'meal_order_addons';

  meal_order_id!: string;
  addon_meal_id!: string;
  quantity!: number;
  amount!: number;
  internal_profit?: number;

  static relationMappings: RelationMappings = {
    mealOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => MealOrder,
      join: { from: 'meal_order_addons.meal_order_id', to: 'meal_orders.id' },
    },
    addonMeal: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Meal,
      join: { from: 'meal_order_addons.addon_meal_id', to: 'meals.id' },
    },
  };
}
