import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  rider_id: string;

  @IsString()
  @IsNotEmpty()
  order_code: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   calculated_order_id: string;

  @IsString()
  @IsNotEmpty()
  order_type_id: string;

  // Status fields
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsBoolean()
  @IsOptional()
  cancelled?: boolean;

  @IsBoolean()
  @IsOptional()
  paid: boolean;

  @IsBoolean()
  @IsOptional()
  scheduled: boolean;

  @IsBoolean()
  @IsOptional()
  is_hidden: boolean;

  // Kitchen workflow
  @IsBoolean()
  @IsOptional()
  kitchen_cancelled?: boolean;

  @IsBoolean()
  @IsOptional()
  kitchen_accepted?: boolean;

  @IsBoolean()
  @IsOptional()
  kitchen_dispatched?: boolean;

  @IsBoolean()
  @IsOptional()
  kitchen_prepared?: boolean;

  @IsBoolean()
  @IsOptional()
  shop_accepted?: boolean;

  @IsBoolean()
  @IsOptional()
  shop_prepared?: boolean;

  // Rider workflow
  @IsBoolean()
  @IsOptional()
  rider_assigned?: boolean;

  @IsBoolean()
  @IsOptional()
  rider_started?: boolean;

  @IsBoolean()
  @IsOptional()
  rider_arrived?: boolean;

  @IsBoolean()
  @IsOptional()
  is_failed_trip?: boolean;

  @IsObject()
  @IsOptional()
  order_change?: Record<string, any>;

  @IsNumber()
  @IsOptional()
  no_of_mealbags_delivered?: number;

  @IsNumber()
  @IsOptional()
  no_of_drinks_delivered?: number;

  @IsObject()
  @IsOptional()
  failed_trip_details?: Record<string, any>;

  @IsString()
  @IsOptional()
  box_number?: string;

  @IsString()
  @IsOptional()
  shelf_id?: string;

  @IsString()
  @IsOptional()
  confirmed_by_id?: string;

  @IsString()
  @IsOptional()
  completed_by_id?: string;

  @IsDateString()
  @IsOptional()
  scheduled_delivery_date?: Date;

  @IsDateString()
  @IsOptional()
  scheduled_delivery_time?: Date;
}
