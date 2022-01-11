const mongoose = require("mongoose");

const { Schema } = mongoose
const questionSchema = new Schema({
  title:String,
  type:String,
  description:String,
  status:String,
  image:[String],
  ownerId:String,
  answerOptions:[{name:String,value:Number,count:{type:Number,default:0}}],
})
module.exports = questionSchema