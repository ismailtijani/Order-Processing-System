import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddressDetailsDto } from 'src/modules/calculated-order/dto/address.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ValidateNested()
  @Type(() => AddressDetailsDto)
  @IsNotEmpty()
  address_details: AddressDetailsDto;
}
