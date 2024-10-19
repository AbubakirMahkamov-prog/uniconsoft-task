import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("organizations", function (table) {
		table.string("id").primary();
        table.string('name').unique().notNullable();
        table.string('created_by_id').nullable();
        table.foreign('created_by_id').references('id').inTable('users').onDelete('RESTRICT');
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("organizations");
}

