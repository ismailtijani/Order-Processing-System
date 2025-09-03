import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { OrderLogModule } from './modules/order-log/order-log.module';
import { MealModule } from './modules/meal/meal.module';
import { CalculatedOrderModule } from './modules/calculated-order/calculated-order.module';
import { AddonModule } from './modules/addon/addon.module';
import { BrandModule } from './modules/brand/brand.module';
import { OrderTypeModule } from './modules/order-type/order-type.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OrderModule, OrderLogModule, MealModule, CalculatedOrderModule, AddonModule, BrandModule, OrderTypeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
