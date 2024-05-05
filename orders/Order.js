const  mongoose  = require("mongoose");

const OrderSchema = mongoose.Schema({
    produits : {type : [String]},
    email_user : {type : String},
    total_price : {type : Number},
    addresse  : {type:String},
    quantity : {type : Number}
    

})
module.exports = Order = mongoose.model("orders",OrderSchema)