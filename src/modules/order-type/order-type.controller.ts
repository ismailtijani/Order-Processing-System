import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import {
  LoggingInterceptor,
  PaginationDto,
  ResponseMessages,
  Routes,
  SuccessResponse,
} from 'src/shared';

@Controller('order-types')
@UseInterceptors(LoggingInterceptor)
export class OrderTypeController {
  constructor(private readonly orderTypeService: OrderTypeService) {}

  @Post(Routes.CREATE_ORDER_TYPE_ROUTE)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderTypeDto: CreateOrderTypeDto) {
    const orderType = await this.orderTypeService.create(createOrderTypeDto);
    return new SuccessResponse(ResponseMessages.ORDER_TYPE_CREATED, orderType);
  }

  @Get(Routes.GET_ORDER_TYPES_ROUTE)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() paginationDto: PaginationDto) {
    const result = await this.orderTypeService.findAll(paginationDto, [
      'orders',
    ]);
    return new SuccessResponse(
      ResponseMessages.ORDER_TYPES_RETRIEVED,
      result.data,
      result.meta,
    );
  }

  @Get(Routes.GET_ONE_ORDER_TYPE)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('orderTypeId', ParseUUIDPipe) id: string) {
    const orderType = await this.orderTypeService.findById(id, ['orders']);
    return new SuccessResponse(
      ResponseMessages.ORDER_TYPE_RETRIEVED,
      orderType,
    );
  }

  @Put(Routes.UPDATE_ORDER_TYPE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('orderTypeId', ParseUUIDPipe) id: string,
    @Body() updateOrderTypeDto: UpdateOrderTypeDto,
  ) {
    const orderType = await this.orderTypeService.update(
      id,
      updateOrderTypeDto,
    );
    return new SuccessResponse(ResponseMessages.ORDER_TYPE_UPDATED, orderType);
  }

  @Delete(Routes.DELETE_ORDER_TYPE)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('orderTypeId', ParseUUIDPipe) id: string) {
    await this.orderTypeService.delete(id);
    return new SuccessResponse(ResponseMessages.ORDER_TYPE_DELETED, null);
  }
}
