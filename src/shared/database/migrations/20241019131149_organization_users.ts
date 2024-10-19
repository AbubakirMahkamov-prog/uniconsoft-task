import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("organization_user", function (table) {
        table.string('org_id').notNullable();
        table.string('user_id');

        // Foreign keys
        table.foreign('org_id').references('id').inTable('organizations').onDelete('CASCADE');

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

        // Unique constraint on org_id and user_id together
        table.unique(['org_id', 'user_id']);
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("organization_user");
}

