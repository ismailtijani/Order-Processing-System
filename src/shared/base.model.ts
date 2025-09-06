import { Model } from 'objection';

export class BaseModel extends Model {
  id!: string;
  created_at!: Date;
  updated_at!: Date;

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'string', format: 'uuid' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };

    // static get modifiers() {
    //   return {
    //     notDeleted(query) {
    //       query.where('is_deleted', false);
    //     },
    //   };
    // }
  }
}
