import { Order } from 'src/modules/order/models/order.model';
import { BaseModel } from 'src/shared/base.model';

export class OrderType extends BaseModel {
  static tableName = 'order_types';

  name!: string;

  static relationMappings = {
    orders: {
      relation: BaseModel.HasManyRelation,
      modelClass: () => Order,
      join: {
        from: 'order_types.id',
        to: 'orders.order_type_id',
      },
    },
  };
}
