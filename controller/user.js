const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const registerUser = async (req, res) => {
  const userModel = new UserModel(req.body);
  userModel.password = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ message: "Email Already Exits ! Try to Login" });
    }
    const response = await userModel.save();
    response.password = undefined;
    res
      .status(201)
      .send({ message: "user register successfully", data: response });
  } catch (error) {
    res.send({ error: error });
  }
};

const loginUser = async (req, res) => {
  let adminEmail = process.env.ADMIN_EMAIL;
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Email not Register" });
    }
    const isPassEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isPassEqual) {
      return res.status(401).send({ message: "Wrong Email or Password" });
    }
    const tokenObject = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      type: req.body.email === adminEmail ? "admin" : "user",
    };
    const token = jwt.sign(tokenObject, process.env.SECERT_KEY, {
      expiresIn: "4h",
    });
    res.status(200).send({
      message: "user login successfully",
      data: tokenObject,
      jwttoken: token,
    });
  } catch (error) {
    res.send({ error: error, message: "something went wrong" });
  }
};

const getAllusers = async (req, res) => {
  try {
    let data = await userModel.find({}, { password: 0 });
    res.status(200).send({ message: "data Fetched", data: data });
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};
const createorder = async (req, res) => {
  try {
    const data = await orderModel.create(req.body);
    res.status(201).send({ message: "staff created", data: data });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
const getAllorder = async (req, res) => {
  try {
    await orderModel
      .find()
      .then((data) => {
        res.status(200).send({ message: "data Fetched", data: data });
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllusers,
  createorder,
  getAllorder,
};
