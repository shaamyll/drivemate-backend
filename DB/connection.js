
const { default: mongoose } = require('mongoose')
const mpngoose = require('mongoose')


const connectionString = process.env.connectionString

mongoose.connect(connectionString).then(res=>{
    console.log("DM Server is connected to DB");
    
})
.catch(err=>{
    console.log("Eror"+err);
    
})