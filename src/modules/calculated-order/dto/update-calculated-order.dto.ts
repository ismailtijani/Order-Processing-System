import { PartialType } from '@nestjs/swagger';
import { CreateCalculatedOrderDto } from './create-calculated-order.dto';

export class UpdateCalculatedOrderDto extends PartialType(CreateCalculatedOrderDto) {}
