import { Expose } from 'class-transformer';
import { AddressResponse } from 'src/modules/calculated-order/dto/address-response.dto';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  phone_number: string;

  @Expose()
  address_details: AddressResponse;

  @Expose()
  is_active: boolean;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
