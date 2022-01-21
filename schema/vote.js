const mongoose = require("mongoose")

const { Schema } = mongoose 

const voteSchema = new Schema({

  userId:String,
  questionId:String,
  answer:String,
  answerIndex:Number,


})

module.exports = voteSchema