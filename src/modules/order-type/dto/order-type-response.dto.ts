import { Expose } from 'class-transformer';

export class OrderTypeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
