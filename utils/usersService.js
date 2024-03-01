const { existsSync, writeFileSync, readFileSync } = require("fs");
const path = require("path");

const storage = [];
const usersDbPath = path.join(__dirname, "..", "usersDB.json");

if (!existsSync(usersDbPath)) {
  writeFileSync(usersDbPath, "[]", "utf8");
} else {
  const storedUsersInDB = readFileSync(usersDbPath, "utf8");
  storage.push(...JSON.parse(storedUsersInDB));
}

const saveUsersToDB = () => writeFileSync(usersDbPath, JSON.stringify(storage), "utf8");
const findUserById = (id) => storage.find((user) => user.id === +id);
const deleteUserById = (id) => {
  const userIndex = storage.findIndex((user) => user.id === +id);
  storage.splice(userIndex, 1);
};

process.on("beforeExit", () => {
  saveUsersToDB();
  process.exit();
});

process.on("SIGINT", () => {
  saveUsersToDB();
  process.exit();
});

module.exports = {
  storage,
  findUserById,
  deleteUserById,
};
