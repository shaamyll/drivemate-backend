// const admin = require('../Models/adminSchema')
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//Register Logic
exports.registerAPI = async(req,res)=>{
    console.log("Inside Register API ");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email}) 
        if(existingUser){
            res.status(402).json({message:"User Already Existing"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,
                email,
                password:hashedPassword
            })
            await newUser.save()
            res.status(200).json({message:"Register Successfull"})
        
    } catch(err){
        res.status(401).json(err)
    }
}



//Login Logic
exports.loginAPI = async(req,res)=>{
    console.log("Inside Login API");
    const {email,password} = req.body

    try{
        const existingUser = await users.findOne({email})
        if(existingUser.role == "admin"){
            res.status(200).json({message:"Admin",existingUser})
        }
         if(existingUser){
            const actualPassword = await bcrypt.compare(password,existingUser.password)
            if (!actualPassword) {
                return res.status(401).json({ message: "Incorrect password" });
            }
            
          if(actualPassword){
            const token = jwt.sign({userId:existingUser._id},process.env.jwtKey)
            console.log(token);
            
            res.status(200).json({message:"Login Successfull",currentUser:existingUser,token})
          }   else{
            res.status(401).json("Incorrect  password")
        }
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