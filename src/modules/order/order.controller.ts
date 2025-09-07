// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   UseInterceptors,
//   HttpStatus,
//   HttpCode,
//   Query,
//   ParseUUIDPipe,
//   Put,
// } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import {
//   LoggingInterceptor,
//   PaginationDto,
//   ResponseMessages,
//   Routes,
//   SuccessResponseDto,
// } from 'src/shared';

// @Controller('orders')
// @UseInterceptors(LoggingInterceptor)
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post(Routes.CREATE_ORDER_ROUTE)
//   @HttpCode(HttpStatus.CREATED)
//   async createOrder(@Body() createOrderDto: CreateOrderDto) {
//     const order = await this.orderService.createCompleteOrder(createOrderDto);
//     return new SuccessResponseDto(ResponseMessages.ORDER_CREATED, order);
//   }

//   @Get(Routes.GET_ORDERS_ROUTE)
//   @HttpCode(HttpStatus.OK)
//   async findAll(@Query() paginationDto: PaginationDto, @Query() filters?: any) {
//     const result = await this.orderService.findAll(
//       paginationDto,
//       [
//         'calculatedOrder.mealOrders.[meal.brand, addons]',
//         'logs',
//         'user',
//         'orderType',
//       ],
//       filters,
//     );
//     return new SuccessResponseDto(
//       ResponseMessages.ORDERS_RETRIEVED,
//       result.data,
//       result.meta,
//     );
//   }

//   @Get(Routes.GET_ONE_ORDER)
//   @HttpCode(HttpStatus.OK)
//   async findOne(@Param('orderId', ParseUUIDPipe) id: string) {
//     const order = await this.orderService.findById(id, [
//       'calculatedOrder.mealOrders.[meal.brand, addons.addonMeal]',
//       'logs',
//       'user',
//       'orderType',
//     ]);
//     return new SuccessResponseDto(ResponseMessages.ORDER_RETRIEVED, order);
//   }

//   @Put(Routes.UPDATE_ORDER)
//   @HttpCode(HttpStatus.OK)
//   async update(
//     @Param('orderId', ParseUUIDPipe) id: string,
//     @Body() updateOrderDto: UpdateOrderDto,
//   ) {
//     const order = await this.orderService.updateOrderStatus(id, updateOrderDto);
//     return new SuccessResponseDto(ResponseMessages.ORDER_UPDATED, order);
//   }

//   @Delete(Routes.DELETE_ORDER)
//   @HttpCode(HttpStatus.OK)
//   async remove(@Param('orderId', ParseUUIDPipe) id: string) {
//     await this.orderService.delete(id);
//     return new SuccessResponseDto(ResponseMessages.ORDER_DELETED, null);
//   }

//   @Post(Routes.PROCESS_ORDER)
//   @HttpCode(HttpStatus.OK)
//   async processOrder(@Param('orderId', ParseUUIDPipe) id: string) {
//     const result = await this.orderService.processOrder(id);
//     return new SuccessResponseDto(ResponseMessages.ORDER_PROCESSED, result);
//   }

//   @Get(Routes.GET_ORDER_LOGS)
//   @HttpCode(HttpStatus.OK)
//   async getOrderLogs(@Param('orderId', ParseUUIDPipe) id: string) {
//     const order = await this.orderService.findById(id, ['logs']);
//     return new SuccessResponseDto(
//       ResponseMessages.ORDER_LOGS_RETRIEVED,
//       order.logs,
//     );
//   }

//   @Get(Routes.GET_USER_ORDERS)
//   @HttpCode(HttpStatus.OK)
//   async getUserOrders(
//     @Param('userId', ParseUUIDPipe) userId: string,
//     @Query() paginationDto: PaginationDto,
//     @Query() filters?: any,
//   ) {
//     const result = await this.orderService.getOrdersByUser(
//       userId,
//       paginationDto,
//       filters,
//     );
//     return new SuccessResponseDto(
//       ResponseMessages.ORDERS_RETRIEVED,
//       result.data,
//       result.meta,
//     );
//   }

//   @Put(':orderId/cancel')
//   @HttpCode(HttpStatus.OK)
//   async cancelOrder(
//     @Param('orderId', ParseUUIDPipe) id: string,
//     @Body('reason') reason: string,
//   ) {
//     const order = await this.orderService.cancelOrder(id, reason);
//     return new SuccessResponseDto('Order cancelled successfully', order);
//   }
// }
