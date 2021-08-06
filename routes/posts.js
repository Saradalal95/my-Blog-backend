const express = require("express");
const auth = require("../middleware/authenticator");
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
  .post(validateInputs(postValidationRules), auth, addPost);
router
  .route("/:id")
  .delete(auth, deletePost)
  .put(validateInputs(postValidationRules), auth, updatePost);
// router.route("/update").post(updatePost);

module.exports = router;
