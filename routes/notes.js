const express = require('express')
const Note = require('../model/note')
const router = express.Router()
const middleware = require('../middleware') 
const upload = require('../filehandler')

router.post('/add', middleware, upload.single('image'), async (req,res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path,
      userId: req.user.id  // Add this line to store the user ID
    });
    await newNote.save()
    res.status(201).json({success: true, note: newNote})
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
  }
});


router.get('/mynotes',middleware,async(req,res)=>{
  try {
    console.log('User ID:', req.user.id)
    const note = await Note.find({ userId: req.user.id })

    return res.status(200).json({success:true,note})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}) 

router.put('/update/:id',middleware,async(req,res)=>{
  try {
    const {id} = req.params 
    const updatedNote = await Note.findByIdAndUpdate(id,req.body)
    return res.status(200).json({success:true,updatedNote})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})

  }
}) 


router.delete('/delete/:id',middleware,async(req,res)=>{
  try {
    const {id} = req.params 
    const deletedNote = await Note.findByIdAndDelete(id)
    return res.status(200).json({success:true,deletedNote})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})

  }
})

module.exports = router


