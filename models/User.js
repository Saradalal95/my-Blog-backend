const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/configs");
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";

  const token = jwt
    .sign({ _id: user._id.toHexString() }, config.jwt_key)
    .toString();
  return token;
};

UserSchema.methods.getPublicFields = function () {
  var returnObject = {
    name: this.name,
    email: this.email,
    _id: this._id,
  };

  return returnObject;
};

UserSchema.methods.checkPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, config.jwt_key);
  } catch (e) {
    return;
  }

  return User.findOne({
    _id: decoded._id,
  });
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("user", UserSchema);
