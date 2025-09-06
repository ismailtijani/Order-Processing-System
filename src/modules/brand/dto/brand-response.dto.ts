import { Expose } from 'class-transformer';

export class BrandResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
