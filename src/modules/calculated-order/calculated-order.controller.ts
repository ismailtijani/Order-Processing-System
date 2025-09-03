import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalculatedOrderService } from './calculated-order.service';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';

@Controller('calculated-order')
export class CalculatedOrderController {
  constructor(private readonly calculatedOrderService: CalculatedOrderService) {}

  @Post()
  create(@Body() createCalculatedOrderDto: CreateCalculatedOrderDto) {
    return this.calculatedOrderService.create(createCalculatedOrderDto);
  }

  @Get()
  findAll() {
    return this.calculatedOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculatedOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalculatedOrderDto: UpdateCalculatedOrderDto) {
    return this.calculatedOrderService.update(+id, updateCalculatedOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculatedOrderService.remove(+id);
  }
}
