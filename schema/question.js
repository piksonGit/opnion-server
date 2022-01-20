const mongoose = require("mongoose");

const { Schema } = mongoose
const questionSchema = new Schema({
  //被浏览的次数
  viewcount:{type:Number,default:0},
  title:String,
  type:String,
  description:String,
  status:{type:String,default:"ready"},//ready,publish,reject.
  image:[String],
  ownerId:String,
  answerOptions:[{name:String,value:Number,count:{type:Number,default:0}}],
})
module.exports = questionSchema