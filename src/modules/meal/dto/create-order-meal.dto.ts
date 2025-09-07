import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderMealDto {
  @IsString()
  @IsNotEmpty()
  meal_id: string;

  @IsNumber()
  @IsOptional()
  quantity: number ;

  @IsString()
  @IsOptional()
  order_note: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderAddonDto)
  @IsOptional()
  addons?: CreateOrderAddonDto[];
}

export class CreateOrderAddonDto {
  @IsString()
  @IsNotEmpty()
  addon_meal_id: string;

  @IsNumber()
  @IsOptional()
  quantity: number;
}
