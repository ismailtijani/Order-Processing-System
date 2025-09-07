import { OrderLog } from 'src/modules/order-log/models/order-log.model';
import { Order } from 'src/modules/order/models/order.model';
import { OrderStatus } from '../enums/enum';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ProcessOrderResult {
  order: Order;
  calculatedTotal: number;
  logs: OrderLog[];
  status: OrderStatus;
}
