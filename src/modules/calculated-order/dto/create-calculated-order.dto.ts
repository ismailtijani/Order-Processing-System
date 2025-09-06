import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDetailsDto } from './address.dto';

export class CreateCalculatedOrderDto {
  @Type(() => Number)
  @IsNumber()
  total_amount: number;

  @IsBoolean()
  free_delivery: boolean;

  @Type(() => Number)
  @IsNumber()
  delivery_fee: number;

  @Type(() => Number)
  @IsNumber()
  service_charge: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  cokitchen_id: string;

  @IsString()
  @IsOptional()
  cokitchen_polygon_id: string;

  @IsBoolean()
  pickup: boolean;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  prev_price?: number;

  @IsString()
  @IsOptional()
  lat: string;

  @IsString()
  @IsOptional()
  lng: string;

  @ValidateNested()
  @Type(() => AddressDetailsDto)
  @IsObject()
  address_details: AddressDetailsDto;
}
