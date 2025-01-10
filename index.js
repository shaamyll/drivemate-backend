//Load .env file
require('dotenv').config()

// 1 Import express
const express = require('express')

// 5 Import  cors
const cors = require('cors')

const db = require('./DB/connection')

const router = require('./Routes/router')
const ApplicationMiddleware = require('./Middlewares/Applicationmiddleware')


// 2 create an application using express
const dmServer = express()

// 6 Use
dmServer.use(cors())
dmServer.use(express.json())
// dmServer.use(ApplicationMiddleware)
dmServer.use(router)



// 3 Port creation
const PORT = 3000 || process.env.PORT

// 4 run
dmServer.listen(PORT,()=>{
    console.log("dm Server is running on the PORT", +PORT);
    
})


dmServer.get('/',(req,res)=>{
    res.send("Welcome to DM server")
})
