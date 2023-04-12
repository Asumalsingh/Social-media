import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    about: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
