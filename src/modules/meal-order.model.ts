import { BaseModel } from 'src/shared/models/base.model';
import { Meal } from './meal/models/meal.model';
import { CalculatedOrder } from './calculated-order/models/calculated-order.model';
import { Model, RelationMappings } from 'objection';
import { MealOrderAddon } from './meal-order-addon.model';

export class MealOrder extends BaseModel {
  static tableName = 'meal_orders';

  calculated_order_id!: string;
  meal_id!: string;
  quantity!: number;
  order_note?: string;
  amount!: number;
  internal_profit?: number;

  static relationMappings: RelationMappings = {
    meal: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Meal,
      join: {
        from: 'meal_orders.meal_id',
        to: 'meals.id',
      },
    },
    calculatedOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => CalculatedOrder,
      join: {
        from: 'meal_orders.calculated_order_id',
        to: 'calculated_orders.id',
      },
    },
    addons: {
      relation: Model.HasManyRelation,
      modelClass: () => MealOrderAddon,
      join: { from: 'meal_orders.id', to: 'meal_order_addons.meal_order_id' },
    },
  };
}
