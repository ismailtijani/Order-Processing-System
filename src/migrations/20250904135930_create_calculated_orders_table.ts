import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('calculated_orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.decimal('total_amount', 10, 2).notNullable();
    table.boolean('free_delivery').defaultTo(false);
    table.decimal('delivery_fee', 10, 2).defaultTo(0);
    table.decimal('service_charge', 10, 2).defaultTo(0);
    table.uuid('user_id').notNullable();
    table.string('cokitchen_id').notNullable();
    table.string('cokitchen_polygon_id').notNullable();
    table.boolean('pickup').defaultTo(false);
    table.decimal('prev_price', 10, 2);
    table.string('lat').notNullable();
    table.string('lng').notNullable();
    table.jsonb('address_details').notNullable();
    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // Indexes
    table.index(['user_id']);
    table.index(['cokitchen_id']);
    table.index(['pickup']);
    table.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('calculated_orders');
}
