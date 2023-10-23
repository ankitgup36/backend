const { default: mongoose } = require("mongoose");

const QueryModel = mongoose.Schema({
    query : {
        type : String,
        required : true
    },
    user : {
        type :String,
        required : true
    }
},
{
    timestamps: true,
}
  )

const Query = mongoose.model('Query', QueryModel)
module.exports = Query