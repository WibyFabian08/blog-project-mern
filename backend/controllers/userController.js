const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (!compare) {
      return res.status(403).json({
        statur: "error",
        message: "wrong password",
      });
    }

    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRED,
    });

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json("something went wrong");
  }
};

exports.signUp = async (req, res) => {
  try {
    if (req.body.confirm !== req.body.password) {
      return res.status(500).json("password not match");
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });

    await user.save();

    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRED,
    });

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};
