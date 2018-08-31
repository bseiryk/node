const express = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { auth } = require("../middleware/auth");
// const mainDebuger = require('debug')('users')

const { User } = require("../Schema/UserSchema");
const router = express.Router();

const schema = {
  password: joi
    .string()
    .max(255)
    .min(5)
    .required(),
  email: joi
    .string()
    .max(255)
    .min(5)
    .required()
    .email()
};

const validate = obj => {
  return joi.validate(obj, schema);
};

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.statusCode = 404;
    res.send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("email not valid");
    return;
  }
  validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400).send("password not valid");
    return;
  }
  const objForToken = {
    email: user.email,
    id: user._id,
    name: user.name
  };
  const token = jwt.sign(objForToken, config.get("jsonPrivatKey"));
  res.header("Authorization", token).send(objForToken);
});

router.get("/me", auth, async (req, res) => {});

module.exports = router;
