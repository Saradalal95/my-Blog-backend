var express = require("express");
var router = express.Router();
const { validateInputs } = require("../middleware/validator");
const { userValidationRules } = require("../lib/validation/userRules");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
  loginUser,
} = require("../controller/userController");

router
  .route("/")
  .get(getUsers)
  .post(validateInputs(userValidationRules), addUser);

router.route("/login").post(loginUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(validateInputs(userValidationRules), updateUser);

module.exports = router;
