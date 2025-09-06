import { Expose } from 'class-transformer';

export class AddressResponse {
  @Expose()
  city: string;

  @Expose()
  name: string;

  @Expose()
  address_line: string;

  @Expose()
  building_number: string;
}
