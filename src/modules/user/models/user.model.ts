import { Model, RelationMappings } from 'objection';
import { Order } from '../../order/models/order.model';
import { CalculatedOrder } from '../../calculated-order/models/calculated-order.model';
import { BaseModel } from 'src/shared/models/base.model';

export class User extends BaseModel {
  static tableName = 'users';

  first_name!: string;
  last_name!: string;
  email!: string;
  phone_number!: string;
  password!: string;
  address_details!: {
    city: string;
    address_line: string;
    building_number?: string;
  };
  is_active!: boolean;

  static relationMappings: RelationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: () => Order,
      join: {
        from: 'users.id',
        to: 'orders.user_id',
      },
    },
    calculatedOrders: {
      relation: Model.HasManyRelation,
      modelClass: () => CalculatedOrder,
      join: {
        from: 'users.id',
        to: 'calculated_orders.user_id',
      },
    },
  };
}
