const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  } ,
  priority:{
    type:String,
    enum:['High','Medium','Low'],
    default:'Low'
  } ,

  deadline: {
    type: Date,
    required: true, // Make it mandatory if needed
    default: Date.now, // Optional: default to the current date
  },

 
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
})


const Task = mongoose.model('Task',taskSchema)

module.exports = Task