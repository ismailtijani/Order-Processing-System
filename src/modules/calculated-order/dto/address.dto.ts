import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDetailsDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address_line: string;

  @IsString()
  @IsNotEmpty()
  building_number: string;
}
