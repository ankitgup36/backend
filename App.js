const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('./Routes/userRoutes.js')
const { connectToTheDatabase } = require('./DBConfig.js')
const { asyncErrorHandler } = require('./Middlewares/asyncErrorHandler.js')
const productRouter = require('./Routes/productRoutes.js')
const queryRouter = require('./Routes/queryRoutes.js')
dotenv.config()


app.use(cors()) // add options later
app.use(express.json())

app.use("/api/user/", userRouter)
app.use("/api/products/", productRouter)
app.use("/api/query/", queryRouter)
app.use(asyncErrorHandler)

const PORT = process.env.PORT || 3010
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