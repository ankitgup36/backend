const UserSchema = require("../Models/userModel.js")

exports.LoginUser = (req, res) => {
    res.send({message : "Logged in successfully"})
    console.log("Login user")
}

exports.LogoutUser = (req, res) => {
    res.send({message : "Logged out successfully"})
    console.log("Logout user")
}

exports.ResetPassword = (req, res) => {
    res.send({message : "reset your password successfully"})
    console.log("reseting password")
}

exports.RegisterUser = async(req, res) => {
    await UserSchema.
    res.send({message : "Registered user successfully"})
    console.log("Registering user")
}