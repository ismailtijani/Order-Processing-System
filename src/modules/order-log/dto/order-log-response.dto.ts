import { Expose } from 'class-transformer';

export class OrderLogResponseDto {
  @Expose()
  id: string;

  @Expose()
  order_id: string;

  @Expose()
  time: Date;

  @Expose()
  description: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
