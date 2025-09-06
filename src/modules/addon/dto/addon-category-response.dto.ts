import { Expose } from 'class-transformer';

export class AddonCategoryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  min_selection: number;

  @Expose()
  required: boolean;

  @Expose()
  position: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
