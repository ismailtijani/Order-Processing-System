import { Module } from '@nestjs/common';
import { CalculatedOrderService } from './calculated-order.service';
import { CalculatedOrderController } from './calculated-order.controller';

@Module({
  controllers: [CalculatedOrderController],
  providers: [CalculatedOrderService],
})
export class CalculatedOrderModule {}
