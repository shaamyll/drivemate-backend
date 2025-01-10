const admin = require('../Models/adminSchema');
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')




//Register Logic
exports.registerAPI = async(req,res)=>{
    console.log("Inside Register API ");
    const {username,email,password} = req.body
    const existingUser = await users.findOne({email}) 
    if(existingUser){
        res.status(402).json({message:"User Already Existing"})
    }
    else{
        const newUser = new users({
            username:username,
            email:email,
            password:password
        })
        await newUser.save()
        res.status(200).json("Register Successfull")
    }
}



//Login Logic
exports.loginAPI = async(req,res)=>{
    console.log("Inside Login API");
    const {email,password} = req.body
    const existingUser = await users.findOne({email,password})
    const registeredAdmin = await admin.findOne({email,password})
    try{

         if(registeredAdmin){
            res.status(200).json("Admin Logged successfully")
        }
        else if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.jwtKey)
            console.log(token);
            
            res.status(200).json({currentUser:existingUser,token})
        }

   
        
        else{
            res.status(404).json("Invalid User Details")
        }
    }
    catch(err){
        res.status(401).json(err)
    }

    
}


exports.getUsersInAdminAPI = async(req,res) => {
    try{
        const response = await users.find()
        res.status(200).json(response)
    }
    catch(err){
        res.status(406).json(err) 
    }
}



exports.userBookingAPI = async(req,res)=>{
    console.log("Inside user Booking");
    res.send("Booked")
    
}