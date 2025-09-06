import { Model, RelationMappings } from 'objection';
import { Meal } from 'src/modules/meal/models/meal.model';
import { BaseModel } from 'src/shared/models/base.model';

export class Brand extends BaseModel {
  static tableName = 'brands';

  name!: string;

  static relationMappings: RelationMappings = {
    meals: {
      relation: Model.HasManyRelation,
      modelClass: () => Meal,
      join: {
        from: 'brands.id',
        to: 'meals.brand_id',
      },
    },
  };
}
