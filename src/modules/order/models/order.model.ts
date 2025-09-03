import { OrderLog } from '../../order-log/models/order-log.model';
import { CalculatedOrder } from '../../calculated-order/models/calculated-order.model';
import { OrderType } from '../../order-type/models/order-type.model';
import { BaseModel } from 'src/shared/base.model';

export class Order extends BaseModel {
  static tableName = 'orders';

  user_id!: string;
  rider_id?: string;
  order_code!: string;
  calculated_order_id!: string;
  order_type_id!: string;

  // Status fields
  completed!: boolean;
  cancelled!: boolean;
  paid!: boolean;
  scheduled!: boolean;
  is_hidden!: boolean;

  // Kitchen workflow
  kitchen_cancelled!: boolean;
  kitchen_accepted!: boolean;
  kitchen_dispatched!: boolean;
  kitchen_prepared!: boolean;
  shop_accepted!: boolean;
  shop_prepared!: boolean;

  // Rider workflow
  rider_assigned!: boolean;
  rider_started!: boolean;
  rider_arrived!: boolean;
  is_failed_trip!: boolean;

  // Timestamps
  kitchen_dispatched_time?: Date;
  completed_time?: Date;
  kitchen_verified_time?: Date;
  kitchen_completed_time?: Date;
  rider_started_time?: Date;
  rider_arrived_time?: Date;
  scheduled_delivery_date?: Date;
  scheduled_delivery_time?: Date;

  // Additional fields
  order_change?: Record<string, any>;
  no_of_mealbags_delivered?: number;
  no_of_drinks_delivered?: number;
  failed_trip_details?: Record<string, any>;
  box_number?: string;
  shelf_id?: string;
  confirmed_by_id?: string;
  completed_by_id?: string;
  order_total_amount_history?: Array<{
    time: Date;
    total_amount: number;
  }>;

  static relationMappings = {
    logs: {
      relation: BaseModel.HasManyRelation,
      modelClass: () => OrderLog,
      join: {
        from: 'orders.id',
        to: 'order_logs.order_id',
      },
    },
    calculatedOrder: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: () => CalculatedOrder,
      join: {
        from: 'orders.calculated_order_id',
        to: 'calculated_orders.id',
      },
    },
    orderType: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: () => OrderType,
      join: {
        from: 'orders.order_type_id',
        to: 'order_types.id',
      },
    },
  };
}
