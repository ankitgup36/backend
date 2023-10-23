const expressAsyncHandler = require("express-async-handler");
const Product = require("../Models/productModel.js");

exports.addProduct = expressAsyncHandler(async(req, res) => {
    await Product.insertMany()
    res.end()
})

exports.getCalculatedProducts = async(req, res) => {
    const {pagination, sort} = req.query
    const paginationLimit = 5;
    
    let skip = pagination ? (((pagination-1) * paginationLimit) + 1) : 1
    let sortType = sort ? (sort == "asc" ? 1 : -1) : null
    let productsList = !sortType ?  await Product.find({}).skip(skip) : await Product.find({}).skip(skip).sort([['Price', sortType]])
    res.status(200).json(productsList)
}

exports.getProductDetails = expressAsyncHandler(async(req, res)=>{
    const id = req.params.id
    const product = await Product.findById(id)
    if(!product){
        const error = new Error('product details not found!')
        error.statusCode = 404;
        throw error
    }
    res.status(200).json({Message : "Data fetched successfully!", details : product})
})