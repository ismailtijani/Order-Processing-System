import { BaseModel } from 'src/shared/models/base.model';

export class MealCategory extends BaseModel {
  static tableName = 'meal_categories';

  name!: string;
  brand_id!: string;
  description?: string;
  position?: number;
  image?: string;
}
