const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    Name : {
        type :String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
},{
    timestamps: true
})

module.exports = UserSchema