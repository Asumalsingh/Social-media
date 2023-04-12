import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    // this userId is like a foreign key
    // it make realation of this table with user table
    userId: { type: String, require: true },
    username: { type: String, require: true },
    caption: String,
    likes: [],
    image: { id: String, url: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", postSchema);
