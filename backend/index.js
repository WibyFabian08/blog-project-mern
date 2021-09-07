const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const path = require("path");
const app = express();
const dotenv = require('dotenv');

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

app.use(express.json({ urlencoded: true, limit: "30MB" }));
dotenv.config();

// cors origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// connect ke db dengan mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, "public/images")));

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// membuat koneksi antara db dengan server
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  app.listen(port, () => {
    console.log("server run on server 5000");
  });
});
