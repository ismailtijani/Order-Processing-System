import { Model, RelationMappings } from 'objection';
import { BaseModel } from 'src/shared/models/base.model';
import { Brand } from './brand/models/brand.model';
import { Addon } from './addon/models/addon.model';

export class AddonCategory extends BaseModel {
  static tableName = 'addon_categories';

  name!: string;
  brand_id!: string;
  description?: string;
  min_selection!: number;
  required!: boolean;
  position?: number;

  // Add to AddonCategory model
  static relationMappings: RelationMappings = {
    addons: {
      relation: Model.HasManyRelation,
      modelClass: () => Addon,
      join: { from: 'addon_categories.id', to: 'addons.addon_category_id' },
    },
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Brand,
      join: { from: 'addon_categories.brand_id', to: 'brands.id' },
    },
  };
}
