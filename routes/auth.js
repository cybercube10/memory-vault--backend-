const express = require('express')
const router =express.Router()
const bcrypt = require('bcryptjs') 
const User = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config() 





router.post('/register',async(req,res)=>{
try {
  const {name,email,password} = req.body 
  const user = await User.findOne({email}) 
  if(user){
    return res.status(401).json({
      success:false,
      message:'User already exists'
    })
  
  }
  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = new User({name,email,password:hashedPassword})
  await newUser.save()

  return res.status(200).json({success:true,message:'User created successfully'})
} catch (error) {
  return res.status(500).json({success:true,message:'Error signing up'})

}
})   


router.post('/login',async(req,res)=>{
  try {
    const {email,password} = req.body 
    const user = await User.findOne({email}) 
    if(!user){
      return res.status(404).json({
        success:false,
        message:' User does not exist'
      }) 
    
    }
    const checkPassword = await bcrypt.compare(password,user.password)
    if(!checkPassword){
     return res.status(400).json({
        success:false,
        message:'Invalid credentials'
      })
    }
    const token = jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET_KEY,{
      expiresIn:'7d'
    })
    return res.status(200).json({success:true,token,user:{name:user.name},message:'LoggedIn successfully'})
  } catch (error) {
    return res.status(500).json({success:true,message:'Error Logging in'})
  
  }
  }) 





module.exports = router