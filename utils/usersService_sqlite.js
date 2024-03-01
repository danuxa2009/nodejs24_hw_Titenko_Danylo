const knexLib = require("knex");
const knexConfig = require("../knexfile");

const knex = knexLib(knexConfig);
const USERS = "USERS";

const getAllUsers = async () => {
  return await knex.select().from(USERS).returning("*");
};
const saveUsersToDB = async (data) => {
  return await knex(USERS).insert(data);
};
const getUserById = async (id) => {
  return await knex.select().from(USERS).where({ id });
};
const deleteUserById = async (id) => {
  return await knex.delete().from(USERS).where({ id });
};

module.exports = {
  saveUsersToDB,
  getUserById,
  deleteUserById,
  getAllUsers,
};
