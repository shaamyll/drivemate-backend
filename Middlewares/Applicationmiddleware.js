const ApplicationMiddleware = (req,res,next)=>{
    console.log("Inside application middleware");
    next()
}

module.exports=ApplicationMiddleware