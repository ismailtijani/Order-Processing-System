import { BaseModel } from 'src/shared/base.model';
import { Meal } from './meal/models/meal.model';
import { CalculatedOrder } from './calculated-order/models/calculated-order.model';

export class MealOrderModel extends BaseModel {
  static tableName = 'meal_orders';

  calculated_order_id!: string;
  meal_id!: string;
  quantity!: number;
  order_note?: string;
  amount!: number;
  internal_profit?: number;

  static relationMappings = {
    meal: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: () => Meal,
      join: {
        from: 'meal_orders.meal_id',
        to: 'meals.id',
      },
    },
    calculatedOrder: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: () => CalculatedOrder,
      join: {
        from: 'meal_orders.calculated_order_id',
        to: 'calculated_orders.id',
      },
    },
  };
}
