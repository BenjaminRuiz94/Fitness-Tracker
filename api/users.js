const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../db");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body, 'req.body')
  console.log("OMG YAY WE GOT HERE !!!!");
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "UserExistsError",
        message: "Username is taken, try again",
      });
    }
    const user = await createUser({ username, password });
    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     username: username,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "1w",
    //   }
    // );
    res.send({
      message: "thanks for registering :)",
      // token: token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
