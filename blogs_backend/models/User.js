const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    Name: {
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

  const token = jwt
    .sign({ _id: user._id.toHexString() }, "FbW43-2-110%")
    .toString();

  return token;
};

UserSchema.methods.getPublicFields = function () {
  var returnObject = {
    firstName: this.firstName,
    email: this.email,
    _id: this._id,
  };
  return returnObject;
};

UserSchema.methods.checkPassword = function (password) {
  const user = this;

  return bcrypt.compare(password, user.password);
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "FbW43-2-110%");
    console.log(decoded);
  } catch (error) {
    console.log(error);
    return;
  }
  return User.findOne({
    _id: decoded._id,
  });
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    return next();
  }
});

module.exports = mongoose.model("User", UserSchema);
