import { Order } from '../../order/models/order.model';
import { Meal } from '../../meal/models/meal.model';
import { BaseModel } from 'src/shared/base.model';

export class CalculatedOrder extends BaseModel {
  static tableName = 'calculated_orders';

  total_amount!: string;
  free_delivery!: boolean;
  delivery_fee!: string;
  service_charge!: string;
  user_id!: string;
  cokitchen_id!: string;
  cokitchen_polygon_id!: string;
  pickup!: boolean;
  prev_price?: string;
  lat!: string;
  lng!: string;
  address_details!: {
    city: string;
    name: string;
    address_line: string;
    building_number: string;
  };

  static relationMappings = {
    order: {
      relation: BaseModel.HasOneRelation,
      modelClass: () => Order,
      join: {
        from: 'calculated_orders.id',
        to: 'orders.calculated_order_id',
      },
    },
    mealOrders: {
      relation: BaseModel.HasManyRelation,
      modelClass: () => Meal,
      join: {
        from: 'calculated_orders.id',
        to: 'meals.calculated_order_id',
      },
    },
  };
}
