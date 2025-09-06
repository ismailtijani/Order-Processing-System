import { Expose } from 'class-transformer';

export class MealCategoryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  position: number;

  @Expose()
  image: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
