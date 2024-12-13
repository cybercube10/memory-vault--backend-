const express = require('express') 
const app = express()
const cors = require('cors')
const authRouter = require('./routes/auth')
const connectDB =  require('./db/connect')
require('dotenv').config()
const taskRouter = require('./routes/task')
const noteRouter = require('./routes/notes')
const pfpRouter = require('./routes/pfp')
const path = require('path')
const fs = require('fs') 


app.use(cors()) 
app.use(express.json())
app.use('/api/users',authRouter)
app.use('/api/users/task',taskRouter)
app.use('/api/users/note',noteRouter)
app.use('/api/users',pfpRouter)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval';");
  next();
});


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


PORT = 3000 || process.env.PORT 
app.listen(PORT,async(req,res)=>{
  try {
    await connectDB(process.env.MONGOURI)
    console.log('server successfully connected to db and listening on PORT',PORT);
    
  } catch (error) {
    console.log('err connecting',error);
    
  }
})