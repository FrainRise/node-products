const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { verifyUniqueEmail } = require("../utils/verifyUserRoute");
const { findEntityById } = require("../utils/findEntityById");

const USERS_FILE_ROUTE = `${__dirname}/../data/users.json`;
const users = JSON.parse(fs.readFileSync(USERS_FILE_ROUTE, "utf-8"));

const getAllUsers = (req, res) => {
  if (!Array.isArray(users)) {
    res.status(500).json({
      status: "error",
      message: "Server Error: Data Not Found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: users,
  });
};
const createUser = (req, res) => {
  verifyUniqueEmail(res, req.body.email, users);

  const newUser = {
    id: uuidv4(),
    ...req.body,
  };

  users.push(newUser);

  fs.writeFile(USERS_FILE_ROUTE, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  });
};
const getUser = (req, res) => {
  const currentUser = findEntityById(res, req.params.id, users);
  if (!currentUser) return;

  res.status(200).json({
    status: "success",
    data: currentUser,
  });
};
const updateUser = (req, res) => {
  const currentUser = findEntityById(res, req.params.id, users);
  if (!currentUser) return;

  const newData = {
    id: currentUser.id,
    ...currentUser,
    ...req.body
  }

  const updatedUsers = users.map(user => 
    user.id === currentUser.id ? newData : user
  );

  fs.writeFile(USERS_FILE_ROUTE, JSON.stringify(updatedUsers), (err) => {
    res.status(201).json({
      status: 'success',
      data: newData,
    });
  });

}
const deleteUser = (req, res) => {
  const currentUser = findEntityById(res, req.params.id, users);
  if (!currentUser) return;

  const newEntity = users.filter((user) => user.id !== currentUser.id);

  fs.writeFile(USERS_FILE_ROUTE, JSON.stringify(newEntity), (err) => {
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
