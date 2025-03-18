const mongoose = require('mongoose')

//2 Schema creation
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: { type: String,default: 'user' }
})


const users = mongoose.model('users',userSchema)
module.exports = users