import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('order_id').notNullable();
    table.timestamp('time').notNullable().defaultTo(knex.fn.now());
    table.text('description').notNullable();
    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('order_id')
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');

    // Indexes
    table.index(['order_id']);
    table.index(['time']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('order_logs');
}
