import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { ErrorMessages } from 'src/shared';
import { BaseService } from 'src/shared/services/base.service';
import { OrderLog } from './models/order-log.model';
import { Order } from '../order/models/order.model';

@Injectable()
export class OrderLogService extends BaseService<OrderLog> {
  constructor() {
    super(OrderLog);
  }

  async createOrderLog(
    createOrderLogDto: CreateOrderLogDto,
  ): Promise<OrderLog> {
    const order = await Order.query().findById(createOrderLogDto.order_id);
    if (!order) {
      throw new BadRequestException(ErrorMessages.ORDER_NOT_FOUND);
    }

    if (!createOrderLogDto.time) {
      createOrderLogDto.time = new Date();
    }

    return super.create(createOrderLogDto);
  }

  async getLogsByOrder(orderId: string) {
    return await OrderLog.query()
      .where('order_id', orderId)
      .orderBy('time', 'asc');
  }

  async getRecentLogs(limit: number = 50) {
    return await OrderLog.query()
      .withGraphFetched('[order.user]')
      .orderBy('time', 'desc')
      .limit(limit);
  }

  protected getCreateErrorMessage(): string {
    return ErrorMessages.ORDER_LOG_CREATION_FAILED;
  }

  protected getUpdateErrorMessage(): string {
    return ErrorMessages.ORDER_LOG_UPDATE_FAILED;
  }

  protected getDeleteErrorMessage(): string {
    return ErrorMessages.ORDER_LOG_DELETION_FAILED;
  }

  protected getNotFoundErrorMessage(): string {
    return ErrorMessages.ORDER_LOG_NOT_FOUND;
  }
}
