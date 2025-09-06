import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meal_order_addons', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('meal_order_id').notNullable();
    table.uuid('addon_meal_id').notNullable();
    table.integer('quantity').notNullable().defaultTo(1);
    table.decimal('amount', 10, 2).notNullable();
    table.decimal('internal_profit', 10, 2).defaultTo(0);
    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('meal_order_id')
      .references('id')
      .inTable('meal_orders')
      .onDelete('CASCADE');
    table
      .foreign('addon_meal_id')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');

    // Indexes
    table.index(['meal_order_id']);
    table.index(['addon_meal_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meal_order_addons');
}
