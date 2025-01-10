const bookings = require('../Models/BookingSchema');



exports.addBookingAPI = async (req, res) => {
    console.log("Inside Booking API");

    const { tripMode, pickupLocation, destinationLocation, city, driverNeeded, date , time , packageHours , carType , carModel , username} = req.body
 
    const userId = req.payload //from jwt middleware


    try {

            const newBooking = new bookings({ tripMode, pickupLocation,
                destinationLocation,
                city,
                driverNeeded,
                date,
                time,
                packageHours,
                carType,
                carModel,
                userId ,
                username
            })

            await newBooking.save()


            res.status(200).json({message:"New Booking",bookings:newBooking})

            
       
    }
    catch (err) {
        res.status(406).json({message:"Error in add booking",error:err})
    }
}




exports.getAllBookingsInDriverAPI = async (req, res) => {
    try {
        const response = await bookings.find()
        res.status(200).json(response)
    }
    catch (err) {
        res.status(406).json(err)
    }
}







exports.acceptBooking = async (req, res) => {
    const { bookingId } = req.params; // Extract bookingId from the route
    const { driverId, driverName, driverPhone } = req.body; // Extract driver details from the request body

    if (!driverId || !driverName || !driverPhone) {
        return res.status(400).json({ error: 'Missing driver details' });
    }

    try {
        // Update booking in the database
        const updatedBooking = await bookings.findByIdAndUpdate(
            bookingId,
            {
                driverDetails: {
                    driverId,
                    driverName,
                    driverPhone,
                    acceptedAt: new Date(),
                },
                status: 'Accepted' ,
            },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        return res.status(200).json({ message: 'Booking accepted', booking: updatedBooking });
    } catch (error) {
        console.error('Error in acceptBooking:', error); // Log the error
        return res.status(406).json({ error: 'Internal server error' });
    }
};








// to get curent bookings in the driver booking 
exports.getCurrentBookingsByDriver = async (req, res) => {
  const { driverId } = req.params;
  try {
      const bookingHistory = await bookings.find({
          "driverDetails.driverId": driverId,
          status: { $in: ["Accepted", "Completed","Cancelled"] }, // Match both "Accepted" and "Completed" statuses
      });
      res.status(200).json(bookingHistory);
  } catch (error) {
      console.error("Error fetching current bookings:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
};





  
// Display accepted, completed, and pending driver details in user page
exports.getUserBookings = async (req, res) => {
    const { userId } = req.params; // Extract userId from the request params
  
    try {
      // Find bookings for the user with 'Accepted', 'Completed', and 'Pending' statuses
      const userBookings = await bookings
        .find({ 
          userId, 
          status: { $in: ['Accepted', 'Completed', 'Pending','Cancelled'] } // Include multiple statuses
        })
        // Uncomment and modify the populate if you want to include specific driver details
        // .populate('driverDetails.driverId', 'name phoneNumber'); 
  
      // If no bookings found, return a 404 response
      if (userBookings.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'No bookings found for this user.' });
      }
  
      // Respond with the found bookings
      res.status(200).json(userBookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
  




  //complete Bookings
  exports.completeBooking = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the booking by ID and update the status to 'Completed'
        const updatedBooking = await bookings.findByIdAndUpdate(
            id,
            { status: 'Completed' },
            // { new: true } // Return the updated document
        );

        // if (!updatedBooking) {
        //     return res.status(404).json({ message: 'Booking not found' });
        // }

        res.status(200).json({
            message: 'Trip completed successfully',
            booking: updatedBooking,
        });
    } catch (error) {
        console.error('Error completing booking:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
  




// Controller function to cancel a booking
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params; // Extract bookingId from the request params

  try {
    // Find and update the booking status to 'Cancelled'
    const updatedBooking = await bookings.findOneAndUpdate(
      { _id: bookingId, status: { $ne: 'Cancelled' } }, // Ensure only non-cancelled bookings are updated
      { status: 'Cancelled' },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or already cancelled.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully.',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

  



// Controller function to fetch bookings for a specific user
exports.getBookingsByUser = async (req, res) => {
  const { userId } = req.params; // Extract userId from request parameters

  try {
    // Find bookings associated with the given userId
    const userBookings = await bookings.find({ userId });


    res.status(200).json({
      success: true,
      message: 'Bookings fetched successfully.',
      bookings: userBookings,
    });
  } catch (error) {
    console.error('Error fetching bookings for user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};