const mongoose = require("mongoose")

const { Schema } = mongoose 

const voteSchema = new Schema({

  userId:String,
  questionId:String,
  answer:String,


})

module.exports = voteSchema