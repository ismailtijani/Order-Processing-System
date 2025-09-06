import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderType } from 'src/shared/enums/enum';

export class CreateOrderTypeDto {
  @IsEnum(OrderType)
  @IsNotEmpty()
  name: OrderType;
}
