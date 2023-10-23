const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Add uniqueness constraint
      // Add email validation using a regular expression or Mongoose's built-in validators
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      // Add password validation for complexity
    },
    phone: {
      type: String, // Store as string for formatting preservation
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    dob: {
      type: Date, // Use Date type for date values
    },
    avatar: {
      type: String,
    },
    oneTimeOTP: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const salt = 10;
  const encryptedPassword = bcrypt.hashSync(this.password, salt);
  this.password = encryptedPassword;
  next();
});

UserSchema.methods.generateAccessToken = function () {
  const privateKey = process.env.JSON_WEB_TOKEN_SECURITY_KEY;
  const token = jwt.sign({ userId: this.id }, privateKey, { expiresIn: "1h" });
  return token;
};

UserSchema.methods.generateRefreshToken = function () {
  const privateKey = process.env.JSON_WEB_TOKEN_SECURITY_KEY;
  const token = jwt.sign({ userId: this.id }, privateKey);
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
