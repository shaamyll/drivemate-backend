const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt middleware");
    
    try{
        const token = req.headers['authorization'].slice(7)
        console.log(token);


        //Token Verify
        jwtTokenVerification = jwt.verify(token,process.env.jwtKey)
        console.log(jwtTokenVerification);
         req.payload = jwtTokenVerification.userId
        next()

        
    }
    catch(err){
        console.log(err);
        res.status(401).json("please Login")
        
    }
}

module.exports=jwtMiddleware