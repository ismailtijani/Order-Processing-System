import { Model, RelationMappings } from 'objection';
import { Order } from '../../order/models/order.model';
import { BaseModel } from 'src/shared/models/base.model';

export class OrderLog extends BaseModel {
  static tableName = 'order_logs';

  order_id!: string;
  time!: Date;
  description!: string;

  static relationMappings: RelationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Order,
      join: {
        from: 'order_logs.order_id',
        to: 'orders.id',
      },
    },
  };
}
