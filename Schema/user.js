const Mongoose  = require("mongoose");


const userSchema = new Mongoose.Schema({
    username:String,
    userid:Number,
    userDescribe:String,
    tel:String,
    gender:Number,
    age:Number,
    address:String,
    coin:Number,
    avatar:String,
    asked:[],
    answered:[{id:String,myOption:Number}],

})

module.exports = userSchema