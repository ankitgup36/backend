const expressAsyncHandler = require("express-async-handler") ;
const Query = require("../Models/queryModel");

exports.storeQuery = expressAsyncHandler(async(req, res)=>{
        const userId = req.userId
        const queryDetails = req.body
        queryDetails['user'] = userId

        if(queryDetails?.query?.length === 0){
            const error = new Error('Query not provided!')
            error.statusCode = 404
            throw error
        }

        const query = new Query(queryDetails)
        await query.save()
        res.status(200).json({Message : "Query saved successfully!"})
})