const mongoose = require('mongoose')

//2 Schema creation
const driverSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    city:{
        type:String,
        require:true
    },
    licenseno:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    
    status: { 
        type: String,
        default: 'pending' ,
        required:true
    }
}, { timestamps: true });


const drivers = mongoose.model('drivers',driverSchema)
module.exports = drivers