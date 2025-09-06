import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meal_orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('calculated_order_id').notNullable();
    table.uuid('meal_id').notNullable();
    table.integer('quantity').notNullable().defaultTo(1);
    table.text('order_note');
    table.decimal('amount', 10, 2).notNullable();
    table.decimal('internal_profit', 10, 2).defaultTo(0);
    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('calculated_order_id')
      .references('id')
      .inTable('calculated_orders')
      .onDelete('CASCADE');
    table
      .foreign('meal_id')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');

    // Indexes
    table.index(['calculated_order_id']);
    table.index(['meal_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meal_orders');
}
