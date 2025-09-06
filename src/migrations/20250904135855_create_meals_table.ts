import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.uuid('brand_id').notNullable();
    table.uuid('meal_category_id');
    table.decimal('amount', 10, 2).notNullable();
    table.boolean('active').defaultTo(true);
    table.integer('available_number');
    table.text('description');
    table.boolean('new').defaultTo(false);
    table.boolean('alcohol').defaultTo(false);
    table.boolean('is_addon').defaultTo(false);
    table.boolean('is_combo').defaultTo(false);
    table.integer('position');
    table.boolean('home_page').defaultTo(false);
    table.string('item_type').notNullable();
    table.integer('calories');
    table.integer('minimum_age').defaultTo(0);
    table.decimal('internal_profit', 10, 2).defaultTo(0);
    table.jsonb('images').defaultTo('[]');
    table.jsonb('meal_tags').defaultTo('[]');
    table.jsonb('meal_keywords').defaultTo('[]');
    table.text('summary');
    table.boolean('is_deleted').defaultTo(false);
    table.jsonb('posist_data');
    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('brand_id')
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE');
    table
      .foreign('meal_category_id')
      .references('id')
      .inTable('meal_categories')
      .onDelete('SET NULL');

    // Indexes
    table.index(['brand_id']);
    table.index(['meal_category_id']);
    table.index(['active']);
    table.index(['is_deleted']);
    table.index(['item_type']);
    table.index(['home_page']);
    table.index(['position']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals');
}
