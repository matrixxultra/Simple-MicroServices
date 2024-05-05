const mongoose  = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {type : String},
    email : {type:String},
    pass : {type:String} 
})
module.exports = User = mongoose.model("users",UserSchema)