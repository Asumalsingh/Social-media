import express from "express";
const router = express.Router();
import validateUser from "../middlewares/validateUser.js";
import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a post : "/post/createPost"
router.post("/createPost", validateUser, async (req, res) => {
  const { caption, image } = req.body;
  try {
    // Upload image on cloudinary
    const uploadImg = await cloudinary.uploader.upload(image, {
      upload_preset: "chit-chat",
    });

    // create post
    const post = new PostModel({
      userId: req.user.id,
      username: req.user.username,
      caption,
      image: { id: uploadImg.public_id, url: uploadImg.secure_url },
    });
    const savedPost = await post.save();
    res.status(201).send(savedPost);
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error" });
  }
});

// Get all post of current user : /post/getAllPost
router.get("/getAllPost/:userId", validateUser, async (req, res) => {
  try {
    const post = await PostModel.find({ userId: req.params.userId });
    res.status(201).send(post.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a post : "/post/updatePost:id"
router.put("/updatePost/:id", validateUser, async (req, res) => {
  let updatedPost = {};
  const { image, caption } = req.body;

  if (image) updatedPost.image = image;
  if (caption) updatedPost.caption = caption;

  try {
    let post = await PostModel.findById(req.params.id);

    // if post does not exist then return
    if (!post) return res.status(403).json({ message: "Post does not exist" });

    post = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedPost,
      },
      { new: true }
    );
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a post : "/post/deletePost/:id"
router.delete("/deletePost/:id", validateUser, async (req, res) => {
  try {
    // find post to be deleted
    let post = await PostModel.findById(req.params.id);

    // if post does not exist then just return
    if (!post) return res.status(403).json({ message: "Post does not exist" });
    cloudinary.uploader.destroy(post.image.id); // delete image from cloudinary
    post = await PostModel.findByIdAndDelete(req.params.id);

    res.status(200).send(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Very important
// get timeline posts : "/post/timelinePost"
router.get("/timelinePost", validateUser, async (req, res) => {
  try {
    const currentUserPosts = await PostModel.find({ userId: req.user.id });

    // Aggeregation pipeline
    const followingPosts = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.user.id) },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res
      .status(200)
      .send(
        currentUserPosts
          .concat(...followingPosts[0].followingPosts)
          .sort((a, b) => b.createdAt - a.createdAt)
      );
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Like dislike : "/post/like/:id"
router.put("/like/:id", validateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    let post = await PostModel.findById(req.params.id);

    // if post does not exist then just return
    if (!post) return res.status(403).json({ message: "Post does not exist" });

    if (post.likes.includes(userId)) {
      post = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
    } else {
      post = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: userId },
        },
        { new: true }
      );
    }

    res.send(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
