const express = require('express')
const router = express.Router()
const Task = require('../model/task') 
const User = require('../model/user')
const middleware = require('../middleware')
router.post('/add',middleware,async(req,res)=>{
  try {
    const {title,priority,deadline} = req.body 
    
  
    const newTask = new Task({title,priority,deadline,userId:req.user.id})
    await newTask.save()
  
    return res.status(200).json({success:true,message:'task added successfully'})
  } catch (error) {
    console.error('Error adding task:', error);  // Log the error

    return res.status(500).json({success:false,message:'Error adding task'})
  
  }
})

router.get('/mytask',middleware,async(req,res)=>{
  try {
    console.log('User ID:', req.user.id)
    const task = await Task.find({ userId: req.user.id })

    return res.status(200).json({success:true,task})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
})

router.put('/update/:id',middleware,async(req,res)=>{
  try {
    const {id} = req.params 
    const updatedTask = await Task.findByIdAndUpdate(id,req.body)
    return res.status(200).json({success:true,updatedTask})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})

  }
}) 


router.delete('/delete/:id',middleware,async(req,res)=>{
  try {
    const {id} = req.params 
    const deletedTask = await Task.findByIdAndDelete(id)
    return res.status(200).json({success:true,deletedTask})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})

  }
})

module.exports = router