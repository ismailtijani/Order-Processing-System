import { Meal } from 'src/modules/meal/models/meal.model';
import { BaseModel } from 'src/shared/base.model';

export class Brand extends BaseModel {
  static tableName = 'brands';

  name!: string;

  static relationMappings = {
    meals: {
      relation: BaseModel.HasManyRelation,
      modelClass: () => Meal,
      join: {
        from: 'brands.id',
        to: 'meals.brand_id',
      },
    },
  };
}
