const mongoose = require('mongoose') 


const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  profilePicture: {
    type: String, // This will store the image URL
    default: '', // Default value if no profile picture is set
  }
})

const User = mongoose.model('User',userSchema)
module.exports = User