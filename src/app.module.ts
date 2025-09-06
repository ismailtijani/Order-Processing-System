import {
  InternalServerErrorException,
  Logger,
  Module,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { OrderLogModule } from './modules/order-log/order-log.module';
import { MealModule } from './modules/meal/meal.module';
import { CalculatedOrderModule } from './modules/calculated-order/calculated-order.module';
import { AddonModule } from './modules/addon/addon.module';
import { BrandModule } from './modules/brand/brand.module';
import { OrderTypeModule } from './modules/order-type/order-type.module';
import { Model } from 'objection';
import knex, { Knex } from 'knex';
import { UserModule } from './modules/user/user.module';
import knexConfig from './database/knexfile';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OrderModule,
    OrderLogModule,
    MealModule,
    CalculatedOrderModule,
    AddonModule,
    BrandModule,
    OrderTypeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  private knexConnection: Knex;
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.knexConnection = knex(knexConfig);
    Model.knex(this.knexConnection);
  }

  async onApplicationBootstrap() {
    await this.testConnection();
  }

  private async testConnection() {
    try {
      await this.knexConnection.raw('select 1+1 as result');
      this.logger.log('✅ Database connected!');
    } catch (err) {
      this.logger.error('❌ Database connection failed', err);
      // Destroy connection to free resources
      await this.knexConnection.destroy();
      throw new InternalServerErrorException(
        'Cannot start app without database connection',
      );
    }
  }
}
