const express = require('express')
const { LoginUser, RegisterUser, ResetPassword, LogoutUser } = require('../Controllers/userControllers.js')

const userRouter = express.Router()

userRouter.post('/login', LoginUser)
userRouter.post('/signup', RegisterUser)
userRouter.post('/reset_password', ResetPassword)
userRouter.get('/logout', LogoutUser)

module.exports = userRouter
