const knexLib = require("knex");
const knexConfig = require("../knexfile");

const knex = knexLib(knexConfig);
const USERS_TABLE = "USERS";

const getAllUsers = async () => {
  return await knex.select().from(USERS_TABLE).returning("*");
};
const saveUsersToDB = async (data) => {
  return await knex(USERS_TABLE).insert(data);
};
const getUserById = async (id) => {
  return await knex.select().from(USERS_TABLE).where({ id });
};
const deleteUserById = async (id) => {
  return await knex.delete().from(USERS_TABLE).where({ id });
};

module.exports = {
  saveUsersToDB,
  getUserById,
  deleteUserById,
  getAllUsers,
};
