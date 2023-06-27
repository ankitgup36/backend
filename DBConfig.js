const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

exports.connectToTheDatabase = async() => {
    await mongoose.connect(process.env.URI)
}