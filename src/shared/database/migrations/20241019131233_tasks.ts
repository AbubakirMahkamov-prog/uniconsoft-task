import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tasks", function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('detail');
        table.string('project_id').notNullable();
        table.string('worker_user_id').notNullable();
        table.enum('status', ['CREATED', 'IN_PROCESS', 'DONE']).notNullable().defaultTo('CREATED');
        table.string('created_by_id').notNullable();
        table.bigInteger("created_at").notNullable().defaultTo(Date.now());
        table.bigInteger("due_date").notNullable();
        table.bigInteger('done_at');

        table.foreign('created_by_id').references('id').inTable('users').onDelete('RESTRICT');
        table.foreign('worker_user_id').references('id').inTable('users').onDelete('RESTRICT');
        table.foreign('project_id').references('id').inTable('projects').onDelete('RESTRICT');
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tasks");
}

