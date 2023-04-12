import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => {
  res.send("We are live");
});

// All available routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

// Connect database and run backend on port 5000
mongoose.connect(process.env.DATABASE_URL).then(() => {
  app.listen(5000, () => {
    console.log("Running on port 5000 . . . .");
  });
});
