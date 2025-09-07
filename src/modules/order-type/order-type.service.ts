import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { ErrorMessages } from 'src/shared';
import { BaseService } from 'src/shared/services/base.service';
import { OrderType } from './models/order-type.model';

@Injectable()
export class OrderTypeService extends BaseService<OrderType> {
  constructor() {
    super(OrderType);
  }

  async create(createOrderTypeDto: CreateOrderTypeDto): Promise<OrderType> {
    const existingOrderType = await this.existsByField(
      'name',
      createOrderTypeDto.name,
    );
    if (existingOrderType) {
      throw new BadRequestException(ErrorMessages.ORDER_TYPE_ALREADY_EXISTS);
    }

    return super.create(createOrderTypeDto);
  }

  async update(
    id: string,
    updateOrderTypeDto: UpdateOrderTypeDto,
  ): Promise<OrderType> {
    if (updateOrderTypeDto.name) {
      const existingOrderType = await this.existsByField(
        'name',
        updateOrderTypeDto.name,
        id,
      );
      if (existingOrderType) {
        throw new BadRequestException(ErrorMessages.ORDER_TYPE_ALREADY_EXISTS);
      }
    }

    return super.update(id, updateOrderTypeDto);
  }

  protected getCreateErrorMessage(): string {
    return ErrorMessages.ORDER_TYPE_CREATION_FAILED;
  }

  protected getUpdateErrorMessage(): string {
    return ErrorMessages.ORDER_TYPE_UPDATE_FAILED;
  }

  protected getDeleteErrorMessage(): string {
    return ErrorMessages.ORDER_TYPE_DELETION_FAILED;
  }

  protected getNotFoundErrorMessage(): string {
    return ErrorMessages.ORDER_TYPE_NOT_FOUND;
  }
}
