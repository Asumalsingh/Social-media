import express from "express";
const router = express.Router();
import { validationResult, body } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";

// Create a user using post : "auth/createUser"
router.post(
  "/createUser",
  [
    body("name", "Name should contains at least 3 letters").isLength({
      min: 3,
    }),
    body("username", "Username should contains at least 3 letters").isLength({
      min: 3,
    }),
    body("password", "Password should contains 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // check input is correct or not
    const errors = validationResult(req);
    // this errors handling is for validation
    if (!errors.isEmpty()) {
      const error = {
        message: errors.errors[0].msg,
      };
      return res.status(400).send(error);
    }

    try {
      // check whether user exist or not
      let user = await UserModel.findOne({ username: req.body.username });
      // if user exist, then send a bad request
      if (user) {
        return res.status(400).send({
          success,
          message: "Username is already exist, try with another username",
        });
      }

      // password hashing
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(req.body.password, salt);

      // Otherwise create new user
      user = new UserModel({
        name: req.body.name,
        username: req.body.username,
        password: hash,
      });
      await user.save();

      const data = {
        id: user.id,
        username: user.username,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.status(201).json({ success, authToken });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

// login : "auth/login"
router.post(
  "/login",
  [
    body("username", "Username should contains at least 3 letters").isLength({
      min: 3,
    }),
    body("password", "Password should contains 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // check input is correct or not
    const errors = validationResult(req);
    // this errors handling is for validation
    if (!errors.isEmpty()) {
      const error = {
        message: errors.errors[0].msg,
      };
      return res.status(400).send(error);
    }
    const { username, password } = req.body;
    try {
      // check whether user exist or not
      let user = await UserModel.findOne({ username });
      // if user does not exist, then send a bad request
      if (!user) {
        return res.status(400).send({
          success,
          message: "Please try to login with correct credentials",
        });
      }

      // check has password is matched or not
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({
          success,
          message: "Please try to login  with correct credentials",
        });
      }

      // If user exist
      const data = {
        id: user.id,
        username: user.username,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.status(200).json({ success, authToken });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export default router;
