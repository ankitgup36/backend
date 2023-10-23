const express = require("express");
const {
  LoginUser,
  RegisterUser,
  ResetPassword,
  LogoutUser,
  refreshAccessToken,
  EditUserProfile,
  GetUserDetails,
  SolveRecaptcha,
} = require("../Controllers/userControllers.js");
const { errorHandler } = require("../Middlewares/ErrorHandlers.js");
const { verifyToken } = require("../Middlewares/authenticationHandler.js");

const userRouter = express.Router();

userRouter.post("/login", LoginUser);
userRouter.post("/signup", errorHandler, RegisterUser);
userRouter.post("/reset_password", ResetPassword);
userRouter.post("/logout", verifyToken, LogoutUser);
userRouter.get("/token/refresh", refreshAccessToken);
userRouter.post('/profile/edit', verifyToken, EditUserProfile)
userRouter.get('/profile/details', verifyToken, GetUserDetails)
userRouter.post('/recaptcha-token', SolveRecaptcha)

module.exports = userRouter;
