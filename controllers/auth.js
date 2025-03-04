const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const {verifyUniqueEmail} = require("../utils/verifyUsersRoute")

const USERS_FILE_ROUTE = `${__dirname}/../data/users.json`;
const users = JSON.parse(fs.readFileSync(USERS_FILE_ROUTE, "utf-8"));

const register = (req, res) => {
  const { username, email, password } = req.body;

  verifyUniqueEmail(res, email, users);

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: uuidv4(), username, email, password: hashedPassword };

  users.push(newUser);

  fs.writeFileSync(USERS_FILE_ROUTE, JSON.stringify(users, null, 2));

  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({ token, ...newUser });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const currentUser = users.find((user) => user.email === email);
  if (!currentUser) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid credentials" });
  }

  const isMatch = bcrypt.compareSync(password, currentUser.password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid password" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = {
  register,
  login,
};
