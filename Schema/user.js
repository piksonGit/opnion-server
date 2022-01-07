const mongoose  = require("mongoose");

const {Schema} = mongoose 
const userSchema = new Schema({
    username:{type:String,default:"bokeh"},
    uid:String,
    email:String,
    userDescribe:String,
    tel:String,
    gender:Number,
    age:Number,
    address:String,
    coin:{type:Number,default:0},
    avatar:String,
    asked: [Schema.Types.ObjectId],
    answered:[{id:String,myOption:Number}],

})
module.exports = userSchema