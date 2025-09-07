import {
  Controller,
  Get,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderLogService } from './order-log.service';
import {
  LoggingInterceptor,
  PaginationDto,
  ResponseMessages,
  Routes,
  SuccessResponse,
} from 'src/shared';

@Controller('order-logs')
@UseInterceptors(LoggingInterceptor)
export class OrderLogController {
  constructor(private readonly orderLogService: OrderLogService) {}

  @Get(Routes.GET_ORDER_LOGS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getOrderLogs(@Query() paginationDto: PaginationDto) {
    const result = await this.orderLogService.findAll(paginationDto, ['order']);
    return new SuccessResponse(
      ResponseMessages.ORDER_LOGS_RETRIEVED,
      result.data,
      result.meta,
    );
  }

  @Get(Routes.GET_ONE_ORDER_LOG)
  @HttpCode(HttpStatus.OK)
  async getOrderLogById(@Param('orderLogId', ParseUUIDPipe) id: string) {
    const orderLog = await this.orderLogService.findById(id, ['order']);
    return new SuccessResponse(ResponseMessages.ORDER_LOG_RETRIEVED, orderLog);
  }

  @Delete(Routes.DELETE_ORDER_LOG)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrderLog(@Param('orderLogId', ParseUUIDPipe) id: string) {
    await this.orderLogService.delete(id);
    return new SuccessResponse(ResponseMessages.ORDER_LOG_DELETED, null);
  }
}
