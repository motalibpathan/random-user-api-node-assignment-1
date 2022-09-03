const fs = require("fs");

const readJsonFile = () => {
  const data = fs.readFileSync("users.json");
  const users = JSON.parse(data);
  return users;
};

module.exports = readJsonFile;
