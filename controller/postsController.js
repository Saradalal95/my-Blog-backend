const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const Post = require("../models/Post");
const createError = require("http-errors");
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("userId", "name");
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};
// exports.addPost = async (req, res, next) => {
//   try {
//     var data = {
//       title: req.body.title,
//       content: req.body.content,
//       userId: req.user._id,
//     };
//     console.log(data);
//     console.log(req.user);
//     const post = new Post(data);
//     await post.save();
//     res.status(200).send(post);
//   } catch (error) {
//     next(error);
//   }
// };
exports.addPost = async (req, res, next) => {
  var data = {
    title: req.body.title,
    content: req.body.content,
    userId: req.user._id,
  };
  try {
    const post = new Post(data);
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    next(e);
  }
};
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findPostById = await Post.findById(id);
    console.log(findPostById);
    console.log(req.user);
    if (req.user._id.toString() == findPostById.userId.toString()) {
      const post = await Post.deleteOne({ _id: id });
      res.status(200).send(post);
    } else {
      res.json("notauth");
    }
    // const post = await Post.deleteOne({ _id: id });
    // res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

// exports.deletePost = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const findPostById = await Post.findById(id);
//     console.log("user", req.user);
//     if (req.user._id.toString() == findPostById.userId.toString()) {
//       const post = await Post.deleteOne({ _id: id });
//       res.status(200).send(post);
//     } else {
//       res.json("notauth");
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// exports.deletePost = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const post = await Post.findByIdAndDelete(id);
//     if (req.user._id.toString() == findPostById.userId.toString()) {
//       const post = await Post.deleteOne({ _id: id });
//       res.status(200).send(post);
//     }
//   } catch (e) {
//     next(e);
//   }
// };

exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
try {
  const findPostById = await Post.findById(id);
  console.log(findPostById);
  console.log(req.user);
  if (req.user._id.toString() == findPostById.userId.toString()) {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(post);
  } else {
    res.json("notauth");
  }
} catch (error) {
  next(error);
}
};
