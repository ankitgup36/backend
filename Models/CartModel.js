const { default: mongoose } = require("mongoose");

const CartModel = mongoose.Schema({
    products : [{
        productId :{
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        }
    }
    ],
    cartvalue : {
        type :Number,
        required : true
    },
    cartcount : {
        type : Number,
        required : true
    }
})

const Cart = mongoose.model