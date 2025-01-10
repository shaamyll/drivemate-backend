const mongoose = require('mongoose')

//2 Schema creation
const BookingSchema = new mongoose.Schema({
    tripMode:{
        type:String
    },
    pickupLocation:{
        type:String
    },
    destinationLocation:{
        type:String
    },
    city:{
        type:String
    },
    driverNeeded:{
        type:String
       
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    packageHours:{
        type:String
    },
    carType:{
        type:String
    },
    carModel:{
        type:String
    },
    userId:{
        type:String
    },
    username:{
        type:String
    },
    driverDetails: {
      driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
      driverName: { type: String, default: null },
      driverPhone: { type: String, default: null },
      acceptedAt: { type: Date, default: null },
    },
    status: { type: String, default: 'Pending' }, 
  },
  
  { timestamps: true });

const bookings = mongoose.model('booking',BookingSchema)
module.exports = bookings