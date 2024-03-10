const knexLib = require("knex");
const knexConfig = require("../knexfile");

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);
const usersStorage = "usersStorage";
const USERS = "users";
const init = async () => {
  try {
    await client.connect();
    console.log("monso is alive");
  } catch (error) {
    console.log("monso is dead");
    process.exit(1);
  }
};
init();

const getAllUsers = async () => {
  return await client.db(usersStorage).collection(USERS).find().toArray();
};
const saveUsersToDB = async (data) => {
  return await client.db(usersStorage).collection(USERS).insertOne(data);
};
const getUserById = async (id) => {
  return await client
    .db(usersStorage)
    .collection(USERS)
    .findOne({ _id: new ObjectId(id) });
};
const deleteUserById = async (id) => {
  return await client
    .db(usersStorage)
    .collection(USERS)
    .deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  saveUsersToDB,
  getUserById,
  deleteUserById,
  getAllUsers,
};
