const mongoose = require("mongoose")
const ProductSchema = mongoose.Schema({
    name : {type : String},
    price : {type : String},
    quantity : {type:String}

})

const Product = mongoose.model("Products",ProductSchema)
module.exports = Product