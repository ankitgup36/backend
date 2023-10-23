const express = require('express')
const { addProduct, getCalculatedProducts, getProductDetails } = require('../Controllers/productControllers.js')
const productRouter = express.Router()

productRouter.get('/', getCalculatedProducts)
productRouter.post('/add/many', addProduct)
productRouter.get('/details/:id', getProductDetails)

module.exports = productRouter