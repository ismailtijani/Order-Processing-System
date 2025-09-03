import { Injectable } from '@nestjs/common';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';

@Injectable()
export class CalculatedOrderService {
  create(createCalculatedOrderDto: CreateCalculatedOrderDto) {
    return 'This action adds a new calculatedOrder';
  }

  findAll() {
    return `This action returns all calculatedOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calculatedOrder`;
  }

  update(id: number, updateCalculatedOrderDto: UpdateCalculatedOrderDto) {
    return `This action updates a #${id} calculatedOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} calculatedOrder`;
  }
}
