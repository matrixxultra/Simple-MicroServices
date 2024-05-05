const  mongoose = require("mongoose");

const StockSchema = mongoose.Schema({
    product_id : {type: String},
    stock : {type:Number}
})
module.exports = Stock = mongoose.model("stocks" , StockSchema)