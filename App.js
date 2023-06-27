const express = require('express')
const app = express()
const dotenv = require('dotenv')
const userRouter = require('./Routes/userRoutes.js')
const { connectToTheDatabase } = require('./DBConfig.js')
dotenv.config()

const PORT = process.env.PORT || 3010
app.use("/api/user/", userRouter)

const server = async() => {
    try {
        await connectToTheDatabase()
        app.listen(PORT)
        console.log("The server is listening to the PORT",PORT)
    } catch (error) {
        console.log("There was some issue while starting the server", error)
    }
}

server()