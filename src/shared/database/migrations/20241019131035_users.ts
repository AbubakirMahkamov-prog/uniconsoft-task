import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", function (table) {
		table.string("id").primary();
        table.string('name').unique().notNullable();
        table.string('created_by_id');
        table.enum('role', ['admin', 'director', 'employee']).notNullable();
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

