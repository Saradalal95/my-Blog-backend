const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const Post = require("../models/Post");
const createError = require("http-errors");
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};
exports.addPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
  // try {
  //   if (req.body.name === "") {
  //     const error = new Error("there is no post to add");
  //     error.status = 400;
  //     error.stack = null;
  //     next(error);
  //   } else {
  //     const post = req.body;
  //     db.get("posts")
  //       .push(post)
  //       .last()
  //       .assign({ id: Math.floor(Math.random() * 10).toString() })
  //       .write();
  //     res.status(201).send(post);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   next(error);
  // }
};
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      throw new createError.NotFound();
    }
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
  // try {
  //   const inputId = req.body.id;
  //   db.get("posts").remove({ id: inputId }).write();
  //   res.status(200).send("Success");
  // } catch (error) {
  //   console.log(error);
  //   next(error);
  // }
};
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, dt, { new: true });
    if (!post) {
      throw new createError.NotFound();
    }

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
  // try {
  //   const postId = req.body.id;
  //   const post = db.get("posts").find({ id: postId }).value();
  //   db.get("posts")
  //     .find({ id: postId })
  //     .assign({
  //       title: req.body.title,
  //       content: req.body.content,
  //     })
  //     .write();
  //   res.status(200).send(post);
  // } catch (error) {
  //   console.log(error);
  //   next(error);
  // }
};
