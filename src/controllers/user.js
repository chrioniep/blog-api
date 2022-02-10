const User = require("../models/Users");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    if (user) {
      const token = await user.generateAuthToken();

      res.status(200).send({
        state: true,
        message: "Successfully authenticate",
        data: { user, token },
      });
    } else {
      res.status(200).send({
        state: false,
        message: "The password or username is incorrect! Please try again",
      });
    }
  } catch (e) {
    res.status(200).send({
      state: false,
      message: e.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 8),
    });
    await user.save();

    res.status(201).send({
      state: true,
      message: "user successfully created",
      data: user,
    });
  } catch (e) {
    res.status(200).send({
      state: false,
      message: e.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).send({
      state: true,
      message: "You have successfully logged out of the app",
    });
  } catch (e) {
    res.status(200).send({
      state: false,
      message: e.message,
    });
  }
};
