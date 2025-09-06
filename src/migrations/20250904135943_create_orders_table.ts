import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable();
    table.uuid('rider_id');
    table.string('order_code').notNullable().unique();
    table.uuid('calculated_order_id').notNullable();
    table.uuid('order_type_id').notNullable();

    // Status fields
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.boolean('paid').defaultTo(false);
    table.boolean('scheduled').defaultTo(false);
    table.boolean('is_hidden').defaultTo(false);

    // Kitchen workflow
    table.boolean('kitchen_cancelled').defaultTo(false);
    table.boolean('kitchen_accepted').defaultTo(false);
    table.boolean('kitchen_dispatched').defaultTo(false);
    table.boolean('kitchen_prepared').defaultTo(false);
    table.boolean('shop_accepted').defaultTo(false);
    table.boolean('shop_prepared').defaultTo(false);

    // Rider workflow
    table.boolean('rider_assigned').defaultTo(false);
    table.boolean('rider_started').defaultTo(false);
    table.boolean('rider_arrived').defaultTo(false);
    table.boolean('is_failed_trip').defaultTo(false);

    // Timestamps
    table.timestamp('kitchen_dispatched_time');
    table.timestamp('completed_time');
    table.timestamp('kitchen_verified_time');
    table.timestamp('kitchen_completed_time');
    table.timestamp('rider_started_time');
    table.timestamp('rider_arrived_time');
    table.date('scheduled_delivery_date');
    table.time('scheduled_delivery_time');

    // Additional fields
    table.jsonb('order_change');
    table.integer('no_of_mealbags_delivered').defaultTo(0);
    table.integer('no_of_drinks_delivered').defaultTo(0);
    table.jsonb('failed_trip_details');
    table.string('box_number');
    table.string('shelf_id');
    table.uuid('confirmed_by_id');
    table.uuid('completed_by_id');
    table.jsonb('order_total_amount_history').defaultTo('[]');

    table.timestamps(true, true);

    // Foreign keys
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('rider_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .foreign('calculated_order_id')
      .references('id')
      .inTable('calculated_orders')
      .onDelete('CASCADE');
    table
      .foreign('order_type_id')
      .references('id')
      .inTable('order_types')
      .onDelete('RESTRICT');
    table
      .foreign('confirmed_by_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .foreign('completed_by_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    // Indexes
    table.index(['user_id']);
    table.index(['rider_id']);
    table.index(['order_code']);
    table.index(['calculated_order_id']);
    table.index(['order_type_id']);
    table.index(['completed']);
    table.index(['cancelled']);
    table.index(['paid']);
    table.index(['kitchen_accepted']);
    table.index(['kitchen_prepared']);
    table.index(['kitchen_dispatched']);
    table.index(['rider_assigned']);
    table.index(['created_at']);
    table.index(['completed_time']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}
