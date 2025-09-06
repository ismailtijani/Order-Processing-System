import { Order } from '../../order/models/order.model';
import { BaseModel } from 'src/shared/models/base.model';
import { Model, RelationMappings } from 'objection';
import { MealOrder } from 'src/modules/meal-order.model';
import { User } from 'src/modules/user/models/user.model';

export class CalculatedOrder extends BaseModel {
  static tableName = 'calculated_orders';

  total_amount!: number;
  free_delivery!: boolean;
  delivery_fee!: number;
  service_charge!: number;
  user_id!: string;
  cokitchen_id!: string;
  cokitchen_polygon_id!: string;
  pickup!: boolean;
  prev_price?: number;
  lat!: string;
  lng!: string;
  address_details!: {
    city: string;
    name: string;
    address_line: string;
    building_number: string;
  };

  static relationMappings: RelationMappings = {
    order: {
      relation: Model.HasOneRelation,
      modelClass: () => Order,
      join: {
        from: 'calculated_orders.id',
        to: 'orders.calculated_order_id',
      },
    },
    mealOrders: {
      relation: Model.HasManyRelation,
      modelClass: () => MealOrder,
      join: {
        from: 'calculated_orders.id',
        to: 'meal_orders.calculated_order_id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => User,
      join: {
        from: 'calculated_orders.user_id',
        to: 'users.id',
      },
    },
  };
}
