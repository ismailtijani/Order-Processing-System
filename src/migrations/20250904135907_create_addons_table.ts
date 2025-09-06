import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addons', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('meal_id').notNullable();
    table.uuid('addon_meal_id').notNullable();
    table.uuid('addon_category_id').notNullable();
    table.decimal('addon_amount', 10, 2).notNullable();
    table.integer('default_quantity').defaultTo(1);
    table.integer('position');
    table.boolean('is_combo').defaultTo(false);
    table.decimal('internal_profit', 10, 2).defaultTo(0);
    table.integer('min_selection').defaultTo(0);
    table.jsonb('images').defaultTo('[]');
    table.jsonb('posist_data');
    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('meal_id')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');
    table
      .foreign('addon_meal_id')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');
    table
      .foreign('addon_category_id')
      .references('id')
      .inTable('addon_categories')
      .onDelete('CASCADE');

    // Indexes
    table.index(['meal_id']);
    table.index(['addon_meal_id']);
    table.index(['addon_category_id']);
    table.index(['position']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addons');
}
