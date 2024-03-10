/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("MOVIES", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("description").notNullable();
    })
    .alterTable("USERS", (table) => {
      table.integer("movies_id").unsigned();
      table.foreign("movies_id").references("id").inTable("USERS");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("USERS", (table) => {
      table.dropForeign("movies_id");
      table.dropColumn("movies_id");
    })
    .dropTable("MOVIES");
};
