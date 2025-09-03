import { Order } from '../../order/models/order.model';
import { BaseModel } from 'src/shared/base.model';

export class OrderLog extends BaseModel {
  static tableName = 'order_logs';

  order_id!: string;
  time!: Date;
  description!: string;

  static relationMappings = {
    order: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: () => Order,
      join: {
        from: 'order_logs.order_id',
        to: 'orders.id',
      },
    },
  };
}
