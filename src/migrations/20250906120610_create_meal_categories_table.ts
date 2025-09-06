import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meal_categories', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.uuid('brand_id').notNullable();
    table.text('description');
    table.integer('position');
    table.string('image');
    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('brand_id')
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE');

    // Indexes
    table.index(['brand_id']);
    table.index(['position']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meal_categories');
}
