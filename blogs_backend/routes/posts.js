const express = require("express");
const router = express.Router();
const { validateInputs } = require("../middleware/validator");
const {
  getPosts,
  addPost,
  deletePost,
  updatePost,
} = require("../controller/postsController");
const { postValidationRules } = require("../lib/validation/postRules");
router
  .route("/")
  .get(getPosts)
  .post(validateInputs(postValidationRules), addPost);
router
  .route("/:id")
  .delete(deletePost)
  .put(validateInputs(postValidationRules), updatePost);
// router.route("/update").post(updatePost);
module.exports = router;
