const express = require('express');
const { storeQuery } = require('../Controllers/QueryControllers');
const { verifyToken } = require('../Middlewares/authenticationHandler');

const queryRouter = express.Router();

queryRouter.post('/add',verifyToken,storeQuery)

module.exports = queryRouter