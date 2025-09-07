// import {
//   BadRequestException,
//   Injectable,
//   Logger,
//   NotFoundException,
// } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { BaseService } from 'src/shared/services/base.service';
// import { Order } from './models/order.model';
// import {
//   ErrorMessages,
//   ORDER_CONSTANTS,
//   OrderStatus,
//   PaginationDto,
//   ProcessOrderResult,
// } from 'src/shared';
// import { User } from '../user/models/user.model';
// import { OrderLog } from '../order-log/models/order-log.model';
// import { MealOrderAddon } from '../meal-order-addon.model';
// import { MealOrder } from '../meal-order.model';
// import { CalculatedOrder } from '../calculated-order/models/calculated-order.model';
// import { Model } from 'objection';
// import { Meal } from '../meal/models/meal.model';

// @Injectable()
// export class OrderService extends BaseService<Order> {
//   private readonly logger = new Logger(OrderService.name);

//   constructor() {
//     super(Order);
//   }

//   async createCompleteOrder(createOrderDto: CreateOrderDto): Promise<Order> {
//     const { user_id, order_type_id } = createOrderDto;

//     // Validate user exists
//     const user = await User.query().findById(user_id);
//     if (!user) {
//       throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
//     }

//     // Validate meals exist and are active
//     await this.validateMeals(meals.map((m) => m.meal_id));

//     // Start transaction
//     return await Model.transaction(async (trx) => {
//       try {
//         // Calculate order totals
//         const { calculatedTotal, mealOrdersData, totalInternalProfit } =
//           await this.calculateOrderTotals(meals, trx);

//         // Create calculated order
//         const calculatedOrder = await CalculatedOrder.query(trx).insert({
//           total_amount: calculatedTotal,
//           free_delivery: calculatedTotal >= 25000, // Free delivery above 25k
//           delivery_fee: pickup ? 0 : calculatedTotal >= 25000 ? 0 : 900,
//           service_charge: 0,
//           user_id,
//           cokitchen_id: '1', // Default kitchen
//           cokitchen_polygon_id: 'polygon_1',
//           pickup,
//           lat: lat || '0',
//           lng: lng || '0',
//           address_details: address_details || user.address_details,
//         });

//         // Generate unique order code
//         const orderCode = await this.generateOrderCode();

//         // Create main order
//         const order = await Order.query(trx).insert({
//           user_id,
//           order_code: orderCode,
//           calculated_order_id: calculatedOrder.id,
//           order_type_id,
//           completed: false,
//           cancelled: false,
//           paid: false,
//           scheduled: false,
//           is_hidden: false,
//           kitchen_cancelled: false,
//           kitchen_accepted: false,
//           kitchen_dispatched: false,
//           kitchen_prepared: false,
//           shop_accepted: false,
//           shop_prepared: false,
//           rider_assigned: false,
//           rider_started: false,
//           rider_arrived: false,
//           is_failed_trip: false,
//           order_total_amount_history: [
//             {
//               time: new Date(),
//               total_amount: calculatedTotal,
//             },
//           ],
//         });

//         // Create meal orders and their addons
//         for (const mealOrderData of mealOrdersData) {
//           const mealOrder = await MealOrder.query(trx).insert({
//             calculated_order_id: calculatedOrder.id,
//             meal_id: mealOrderData.meal_id,
//             quantity: mealOrderData.quantity,
//             order_note: mealOrderData.order_note,
//             amount: mealOrderData.amount,
//             internal_profit: mealOrderData.internal_profit,
//           });

//           // Create meal order addons
//           for (const addonData of mealOrderData.addons) {
//             await MealOrderAddon.query(trx).insert({
//               meal_order_id: mealOrder.id,
//               addon_meal_id: addonData.addon_meal_id,
//               quantity: addonData.quantity,
//               amount: addonData.amount,
//               internal_profit: addonData.internal_profit,
//             });
//           }
//         }

//         // Create initial order log
//         await OrderLog.query(trx).insert({
//           order_id: order.id,
//           time: new Date(),
//           description: 'Order received in kitchen',
//         });

//         this.logger.log(`Order created successfully: ${order.order_code}`, {
//           orderId: order.id,
//         });

//         // Return order with relations
//         return await Order.query(trx).findById(order.id).withGraphFetched(`[
//             calculatedOrder.[mealOrders.[meal.brand, addons.addonMeal]],
//             logs,
//             user,
//             orderType
//           ]`);
//       } catch (error) {
//         this.logger.error('Failed to create order', error);
//         throw new BadRequestException(ErrorMessages.ORDER_CREATION_FAILED);
//       }
//     });
//   }

//   /**
//    * Process order through kitchen workflow
//    * Implements comprehensive business logic for order status management
//    */
//   async processOrder(orderId: string): Promise<ProcessOrderResult> {
//     const order = await this.findById(orderId, [
//       'calculatedOrder.mealOrders.[meal.brand, addons.addonMeal]',
//       'logs',
//       'user',
//     ]);

//     if (order.completed) {
//       throw new BadRequestException(ErrorMessages.ORDER_ALREADY_COMPLETED);
//     }

//     if (order.cancelled || order.kitchen_cancelled) {
//       throw new BadRequestException(ErrorMessages.ORDER_ALREADY_CANCELLED);
//     }

//     return await Model.transaction(async (trx) => {
//       const logs: OrderLog[] = [];
//       let currentStatus: OrderStatus = OrderStatus.PENDING;

//       try {
//         // Step 1: Kitchen Acceptance
//         if (!order.kitchen_accepted) {
//           await Order.query(trx).patchAndFetchById(orderId, {
//             kitchen_accepted: true,
//             kitchen_verified_time: new Date(),
//           });

//           const acceptLog = await OrderLog.query(trx).insert({
//             order_id: orderId,
//             time: new Date(),
//             description: 'Order accepted by kitchen',
//           });
//           logs.push(acceptLog);
//           currentStatus = OrderStatus.ACCEPTED;

//           this.logger.log(`Order ${order.order_code} accepted by kitchen`);
//         }

//         // Step 2: Kitchen Preparation
//         if (order.kitchen_accepted && !order.kitchen_prepared) {
//           await Order.query(trx).patchAndFetchById(orderId, {
//             kitchen_prepared: true,
//             shop_accepted: true,
//             shop_prepared: true,
//             kitchen_completed_time: new Date(),
//           });

//           const preparedLog = await OrderLog.query(trx).insert({
//             order_id: orderId,
//             time: new Date(),
//             description: 'Order completed by kitchen',
//           });
//           logs.push(preparedLog);
//           currentStatus = OrderStatus.PREPARED;

//           this.logger.log(`Order ${order.order_code} prepared by kitchen`);
//         }

//         // Step 3: Kitchen Dispatch
//         if (order.kitchen_prepared && !order.kitchen_dispatched) {
//           await Order.query(trx).patchAndFetchById(orderId, {
//             kitchen_dispatched: true,
//             kitchen_dispatched_time: new Date(),
//           });

//           const dispatchLog = await OrderLog.query(trx).insert({
//             order_id: orderId,
//             time: new Date(),
//             description: 'Order dispatched by front desk',
//           });
//           logs.push(dispatchLog);
//           currentStatus = OrderStatus.DISPATCHED;

//           this.logger.log(`Order ${order.order_code} dispatched`);
//         }

//         // Step 4: Rider Assignment (if not pickup)
//         if (
//           order.kitchen_dispatched &&
//           !order.calculatedOrder.pickup &&
//           !order.rider_assigned
//         ) {
//           // Auto-assign rider logic could be implemented here
//           // For now, we'll mark it as ready for assignment
//           currentStatus = OrderStatus.OUT_FOR_DELIVERY;
//         }

//         // Step 5: Order Completion
//         if (
//           order.kitchen_dispatched &&
//           (order.calculatedOrder.pickup || order.rider_arrived)
//         ) {
//           await Order.query(trx).patchAndFetchById(orderId, {
//             completed: true,
//             completed_time: new Date(),
//           });

//           const completionDescription = order.calculatedOrder.pickup
//             ? 'Order picked up by customer'
//             : 'Trip Completed By Rider';

//           const completedLog = await OrderLog.query(trx).insert({
//             order_id: orderId,
//             time: new Date(),
//             description: completionDescription,
//           });
//           logs.push(completedLog);
//           currentStatus = OrderStatus.COMPLETED;

//           this.logger.log(`Order ${order.order_code} completed`);
//         }

//         // Recalculate totals to ensure accuracy
//         const calculatedTotal = await this.recalculateOrderTotal(order);

//         // Get updated order
//         const updatedOrder = await Order.query(trx).findById(orderId)
//           .withGraphFetched(`[
//             calculatedOrder.[mealOrders.[meal.brand, addons.addonMeal]],
//             logs,
//             user,
//             orderType
//           ]`);

//         return {
//           order: updatedOrder,
//           calculatedTotal,
//           logs: [...order.logs, ...logs],
//           status: currentStatus,
//         };
//       } catch (error) {
//         this.logger.error(`Failed to process order ${order.order_code}`, error);
//         throw new BadRequestException(ErrorMessages.ORDER_PROCESSING_FAILED);
//       }
//     });
//   }

//   /**
//    * Update order status with validation
//    */
//   async updateOrderStatus(
//     orderId: string,
//     updateData: UpdateOrderDto,
//   ): Promise<Order> {
//     const order = await this.findById(orderId);

//     // Validate status transitions
//     this.validateStatusTransition(order, updateData);

//     return await Model.transaction(async (trx) => {
//       // Update order
//       const updatedOrder = await Order.query(trx).patchAndFetchById(
//         orderId,
//         updateData,
//       );

//       // Create appropriate logs based on status changes
//       await this.createStatusChangeLogs(orderId, order, updateData, trx);

//       return await Order.query(trx)
//         .findById(orderId)
//         .withGraphFetched(
//           `[calculatedOrder.mealOrders.[meal, addons], logs, user]`,
//         );
//     });
//   }

//   /**
//    * Cancel order with proper validations
//    */
//   async cancelOrder(orderId: string, reason: string): Promise<Order> {
//     const order = await this.findById(orderId);

//     if (order.completed) {
//       throw new BadRequestException(ErrorMessages.ORDER_ALREADY_COMPLETED);
//     }

//     if (order.cancelled) {
//       throw new BadRequestException(ErrorMessages.ORDER_ALREADY_CANCELLED);
//     }

//     if (order.kitchen_dispatched) {
//       throw new BadRequestException(ErrorMessages.ORDER_CANNOT_BE_CANCELLED);
//     }

//     return await Model.transaction(async (trx) => {
//       await Order.query(trx).patchAndFetchById(orderId, {
//         cancelled: true,
//         kitchen_cancelled: true,
//       });

//       await OrderLog.query(trx).insert({
//         order_id: orderId,
//         time: new Date(),
//         description: `Order cancelled: ${reason}`,
//       });

//       this.logger.log(`Order ${order.order_code} cancelled: ${reason}`);

//       return await Order.query(trx)
//         .findById(orderId)
//         .withGraphFetched(
//           `[calculatedOrder.mealOrders.[meal, addons], logs, user]`,
//         );
//     });
//   }

//   /**
//    * Get orders by user with advanced filtering
//    */
//   async getOrdersByUser(
//     userId: string,
//     paginationDto: PaginationDto,
//     filters: {
//       status?: string;
//       dateFrom?: Date;
//       dateTo?: Date;
//       orderType?: string;
//     } = {},
//   ) {
//     const { page, limit } = paginationDto;
//     const offset = (page - 1) * limit;

//     let query = Order.query().where('user_id', userId).withGraphFetched(`[
//         calculatedOrder.[mealOrders.[meal.brand, addons.addonMeal]],
//         logs,
//         orderType
//       ]`);

//     // Apply status filter
//     if (filters.status) {
//       switch (filters.status.toLowerCase()) {
//         case 'pending':
//           query = query.where('completed', false).where('cancelled', false);
//           break;
//         case 'completed':
//           query = query.where('completed', true);
//           break;
//         case 'cancelled':
//           query = query.where('cancelled', true);
//           break;
//         case 'preparing':
//           query = query
//             .where('kitchen_accepted', true)
//             .where('kitchen_prepared', false);
//           break;
//       }
//     }

//     // Apply date filters
//     if (filters.dateFrom) {
//       query = query.where('created_at', '>=', filters.dateFrom);
//     }
//     if (filters.dateTo) {
//       query = query.where('created_at', '<=', filters.dateTo);
//     }

//     // Apply order type filter
//     if (filters.orderType) {
//       query = query.where('order_type_id', filters.orderType);
//     }

//     const total = await query.resultSize();
//     const data = await query
//       .offset(offset)
//       .limit(limit)
//       .orderBy('created_at', 'desc');

//     return {
//       data,
//       meta: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//         hasNext: page < Math.ceil(total / limit),
//         hasPrev: page > 1,
//       },
//     };
//   }

//   // Private helper methods

//   private async validateMeals(mealIds: string[]): Promise<void> {
//     const meals = await Meal.query()
//       .whereIn('id', mealIds)
//       .where('active', true)
//       .where('is_deleted', false);

//     if (meals.length !== mealIds.length) {
//       throw new BadRequestException('Some meals are not available');
//     }

//     // Check stock availability
//     for (const meal of meals) {
//       if (meal.available_number !== null && meal.available_number <= 0) {
//         throw new BadRequestException(`${meal.name} is out of stock`);
//       }
//     }
//   }

//   private async calculateOrderTotals(meals: any[], trx?: any) {
//     let calculatedTotal = 0;
//     let totalInternalProfit = 0;
//     const mealOrdersData = [];

//     for (const mealData of meals) {
//       const meal = await Meal.query(trx).findById(mealData.meal_id);
//       if (!meal) {
//         throw new BadRequestException(`Meal ${mealData.meal_id} not found`);
//       }

//       const quantity = 1; // Default quantity
//       let mealAmount = meal.amount * quantity;
//       let mealInternalProfit = (meal.internal_profit || 0) * quantity;

//       const addonsData = [];

//       // Calculate addon costs
//       for (const addonData of mealData.addons || []) {
//         const addonMeal = await Meal.query(trx).findById(
//           addonData.addon_meal_id,
//         );
//         if (!addonMeal) {
//           throw new BadRequestException(
//             `Addon meal ${addonData.addon_meal_id} not found`,
//           );
//         }

//         const addonQuantity = addonData.quantity || 1;
//         const addonAmount = addonMeal.amount * addonQuantity;
//         const addonInternalProfit =
//           (addonMeal.internal_profit || 0) * addonQuantity;

//         addonsData.push({
//           addon_meal_id: addonData.addon_meal_id,
//           quantity: addonQuantity,
//           amount: addonAmount,
//           internal_profit: addonInternalProfit,
//         });

//         mealAmount += addonAmount;
//         mealInternalProfit += addonInternalProfit;
//       }

//       mealOrdersData.push({
//         meal_id: mealData.meal_id,
//         quantity,
//         order_note: mealData.order_note,
//         amount: mealAmount,
//         internal_profit: mealInternalProfit,
//         addons: addonsData,
//       });

//       calculatedTotal += mealAmount;
//       totalInternalProfit += mealInternalProfit;
//     }

//     return { calculatedTotal, mealOrdersData, totalInternalProfit };
//   }

//   private async generateOrderCode(): Promise<string> {
//     const prefix = ORDER_CONSTANTS.ORDER_CODE_PREFIX;
//     const timestamp = Date.now().toString().slice(-6);
//     const random = Math.floor(Math.random() * 1000)
//       .toString()
//       .padStart(3, '0');

//     let orderCode = `${prefix}${timestamp}${random}`;

//     // Ensure uniqueness
//     const existing = await Order.query().where('order_code', orderCode).first();
//     if (existing) {
//       return this.generateOrderCode(); // Recursive retry
//     }

//     return orderCode;
//   }

//   private async recalculateOrderTotal(order: Order): Promise<number> {
//     let total = 0;

//     for (const mealOrder of order.calculatedOrder.mealOrders) {
//       total += mealOrder.amount;
//     }

//     return total;
//   }

//   private validateStatusTransition(
//     order: Order,
//     updateData: UpdateOrderDto,
//   ): void {
//     // Prevent invalid status transitions
//     if (updateData.completed && order.cancelled) {
//       throw new BadRequestException('Cannot complete a cancelled order');
//     }

//     if (updateData.cancelled && order.completed) {
//       throw new BadRequestException('Cannot cancel a completed order');
//     }

//     if (updateData.kitchen_dispatched && !order.kitchen_prepared) {
//       throw new BadRequestException('Order must be prepared before dispatch');
//     }
//   }

//   private async createStatusChangeLogs(
//     orderId: string,
//     originalOrder: Order,
//     updateData: UpdateOrderDto,
//     trx: any,
//   ): Promise<void> {
//     const logs = [];

//     if (updateData.kitchen_accepted && !originalOrder.kitchen_accepted) {
//       logs.push('Order accepted by kitchen');
//     }

//     if (updateData.kitchen_prepared && !originalOrder.kitchen_prepared) {
//       logs.push('Order completed by kitchen');
//     }

//     if (updateData.kitchen_dispatched && !originalOrder.kitchen_dispatched) {
//       logs.push('Order dispatched by front desk');
//     }

//     if (updateData.completed && !originalOrder.completed) {
//       logs.push('Order completed');
//     }

//     if (updateData.cancelled && !originalOrder.cancelled) {
//       logs.push('Order cancelled');
//     }

//     for (const description of logs) {
//       await OrderLog.query(trx).insert({
//         order_id: orderId,
//         time: new Date(),
//         description,
//       });
//     }
//   }

//   // Override base service methods
//   protected getCreateErrorMessage(): string {
//     return ErrorMessages.ORDER_CREATION_FAILED;
//   }

//   protected getUpdateErrorMessage(): string {
//     return ErrorMessages.ORDER_UPDATE_FAILED;
//   }

//   protected getDeleteErrorMessage(): string {
//     return ErrorMessages.ORDER_DELETION_FAILED;
//   }

//   protected getNotFoundErrorMessage(): string {
//     return ErrorMessages.ORDER_NOT_FOUND;
//   }
// }
