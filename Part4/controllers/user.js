const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response, next) => {
  try {
    const { password, username, name } = request.body;

    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "password is too short or missing" });
    }
    if (username.length < 3) {
      return response
        .status(400)
        .json({ error: "username is too short or missing" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ error: "Username already exist" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: username,
      name: name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs");
    response.json(users);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
