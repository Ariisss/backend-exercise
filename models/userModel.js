let users = [];

const findUserByEmail = (email) => users.find((user) => user.email === email);

const findUserById = (id) => users.find((user) => user.id === id);

const addUser = ({ username, password, email }) => {
  const id = users.length + 1;
  users.push({ id, username, password, email });
};

module.exports = { findUserByEmail, findUserById, addUser };
