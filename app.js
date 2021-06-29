var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

const { setCors } = require("./middleware/security");
var app = express();
app.use(logger("dev"));
mongoose.connect(
  "mongodb+srv://Sara:Test1234@cluster0.4z6q6.mongodb.net/blog?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Successfully connected to the database");
});
// const adapter = new FileSync("data/db.json");

// db.defaults({
//   posts: [],
// }).write();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(setCors);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// app.use(function (req, res, next) {
//   const error = new Error("Looks like something broke...");
//   error.status = 400;
//   next(error);
// });

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    error: {
      message: err.message,
    },
  });
});

// app.listen(3001, () => console.log("Running on http://localhost:3001"));
module.exports = app;
