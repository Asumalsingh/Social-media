import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import validateUser from "../middlewares/validateUser.js";

// Get user data : "user/getUser"
router.post("/getUser", validateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get user by id
router.get("/getById/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");

    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get all users : "user/all"
router.get("/all", validateUser, async (req, res) => {
  try {
    const users = await UserModel.find({
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
        { name: { $regex: req.query.search, $options: "i" } },
        // filter using query
      ],
    }).select("-password");
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Update user data : "user/updateUser"
router.put("/updateUser", validateUser, async (req, res) => {
  const { name, username, password, about } = req.body;

  const updatedUser = {};
  if (name) updatedUser.name = name;
  if (username) updatedUser.username = username;
  if (about) updatedUser.about = about;

  // Hash password before updating
  if (password) {
    // password hashing
    let salt = await bcrypt.genSalt(10);
    updatedUser.password = await bcrypt.hash(req.body.password, salt);
  }

  // update
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $set: updatedUser },
      { new: true } // by using this true user returns after update
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// handle follow request : "user/follow/:id"
router.put("/follow/:id", validateUser, async (req, res) => {
  // Id of user which current user wants to follow
  const followedUserId = req.params.id;
  const currUserId = req.user.id;
  if (followedUserId === currUserId) {
    res.status(403).json({ message: "You cann't follow or unfollow yourself" });
  } else {
    try {
      // User you we want to follow
      const userToBeFollow = await UserModel.findById(followedUserId);
      let currentUser = await UserModel.findById(currUserId);

      // if current user is already follows the target user then just "return"
      if (!userToBeFollow.followers.includes(currUserId)) {
        // add current user in the followers list of target user
        await userToBeFollow.updateOne({ $push: { followers: currUserId } });
        // add target user in the following list of current user
        currentUser = await UserModel.findByIdAndUpdate(
          currUserId,
          {
            $push: { following: followedUserId },
          },
          { new: true }
        ).select("-password");
      } else {
        res
          .status(403)
          .json({ message: "Already, you are following this user" });
      }

      res.status(200).send(currentUser);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
});

// handle unfollow : "user/unfollow/:id"
router.put("/unfollow/:id", validateUser, async (req, res) => {
  // Id of user which current user wants to follow
  const followedUserId = req.params.id;
  const currUserId = req.user.id;
  if (followedUserId === currUserId) {
    res.status(403).json({ message: "You cann't follow or unfollow yourself" });
  } else {
    try {
      // User you we want to follow
      const userToBeFollow = await UserModel.findById(followedUserId);
      let currentUser = await UserModel.findById(currUserId);

      // if current user present int the followers list of target user, then remove it otherwise "return"
      if (userToBeFollow.followers.includes(currUserId)) {
        // add current user in the followers list of target user
        await userToBeFollow.updateOne({ $pull: { followers: currUserId } });
        // add target user in the following list of current user
        currentUser = await UserModel.findByIdAndUpdate(
          currUserId,
          {
            $pull: { following: followedUserId },
          },
          { new: true }
        ).select("-password");
      } else {
        res.status(403).json({ message: "You don't follow this user" });
      }

      res.status(200).send(currentUser);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
});
export default router;
