const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserByUsername,
  getPublicRoutinesByUser,
} = require("../db");
const { requireUser } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      throw {
        name: "UserExistsError",
        message: "Username is taken, try again",
      };
    }
    if (password.length < 8) {
      throw {
        name: "PasswordTooShort",
        message: "Password is too short, try again",
      };
    }
    const user = await createUser({ username, password });
    const token = jwt.sign(
      {
        id: user.id,
        username: username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.send({ user, token });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw {
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    };
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.send({ message: "you're logged in!", token: token });
    } else {
      throw {
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      };
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const { username } = req.user;
    const user = await getUserByUsername(username);

    res.send(user);
  } catch (error) {
    throw {
      name: "User error",
      message: `User requested must be ${username}`,
    };
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const user = req.params;
    const username = await getPublicRoutinesByUser(user);
    res.send(username);
  } catch (error) {
    throw {
      name: "Routines request error",
      message: `Routines requested do not match ${username}'s routines.`,
    };
  }
});

module.exports = usersRouter;
