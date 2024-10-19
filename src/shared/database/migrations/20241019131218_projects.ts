import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("projects", function (table) {
        table.string('id').primary();
        table.string('name').unique().notNullable();
        table.string('org_id').notNullable();
        table.string('created_by_id').notNullable();
        table.foreign('created_by_id').references('id').inTable('users').onDelete('RESTRICT');
        table.foreign('org_id').references('id').inTable('organizations').onDelete('RESTRICT');
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("projects");
}

