import fs from "fs";

export function createUsersService() {
  return {
    createUser,
    deleteUser,
    findUser,
  };

  async function findUser(userId) {
    try {
      const users = getUsers();
      const user = users.find((user) => userId === user.userId);

      return user;
    } catch (err) {
      console.log("Something went wrong", err);
    }
  }

  async function deleteUser(userId) {
    try {
      const users = getUsers();
      const filteredUsers = users.filter((user) => userId !== user.id);
      saveUsers(filteredUsers);
    } catch (err) {
      console.log("Failed to delete user", err);
    }
  }

  async function createUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
  }
}

const saveUsers = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("mockdb/users.json", stringifyData);
};

const getUsers = () => {
  const jsonData = fs.readFileSync("mockDb/users.json");
  return JSON.parse(jsonData);
};
