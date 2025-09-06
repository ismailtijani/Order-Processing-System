import { Model, RelationMappings } from 'objection';
import { Order } from 'src/modules/order/models/order.model';
import { BaseModel } from 'src/shared/models/base.model';

export class OrderType extends BaseModel {
  static tableName = 'order_types';

  name!: string;

  static relationMappings: RelationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: () => Order,
      join: {
        from: 'order_types.id',
        to: 'orders.order_type_id',
      },
    },
  };
}
