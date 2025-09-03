import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedOrderController } from './calculated-order.controller';
import { CalculatedOrderService } from './calculated-order.service';

describe('CalculatedOrderController', () => {
  let controller: CalculatedOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatedOrderController],
      providers: [CalculatedOrderService],
    }).compile();

    controller = module.get<CalculatedOrderController>(CalculatedOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
