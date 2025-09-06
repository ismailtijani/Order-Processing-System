import { Expose } from 'class-transformer';
import { AddressResponse } from './address-response.dto';

export class CalculatedOrderResponseDto {
  @Expose()
  id: string;

  @Expose()
  total_amount: number;

  @Expose()
  free_delivery: boolean;

  @Expose()
  delivery_fee: number;

  @Expose()
  service_charge: number;

  @Expose()
  user_id: string;

  @Expose()
  cokitchen_id: string;

  @Expose()
  cokitchen_polygon_id: string;

  @Expose()
  pickup: boolean;

  @Expose()
  prev_price: number;

  @Expose()
  lat: string;

  @Expose()
  lng: string;

  @Expose()
  address_details: AddressResponse;
  // Optional: order, mealOrders[]
}
