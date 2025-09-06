import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderLogDto {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsDateString()
  time: Date;

  @IsString()
  @IsNotEmpty()
  description: string;
}
