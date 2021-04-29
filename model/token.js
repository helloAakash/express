const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema


const tokenSchema = new mongoose.Schema({
  token:{
    type:String,
    required:true
  },
  userId:{
    type:ObjectId,
    ref:'User',
    required:true
  },
  createdAt:{
    type:Date,
    required:true,
    default:Date.now(),
    expires:3600
  }
})


module.exports=mongoose.model('Token',tokenSchema)
