import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedOrderService } from './calculated-order.service';

describe('CalculatedOrderService', () => {
  let service: CalculatedOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatedOrderService],
    }).compile();

    service = module.get<CalculatedOrderService>(CalculatedOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
