const express = require('express')
const userController = require('../Controllers/userController')
const driverController = require('../Controllers/driverController')
const BookingController = require('../Controllers/BookingController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const twilio = require('../Controllers/twilio-sms')
const PaymentController = require('../Controllers/PaymentController')

const router = express.Router()

router.post('/api/sendOtp',twilio.sendOtp)

router.post('/api/verifyOtp',twilio.verifyOtp)


router.post('/api/register',userController.registerAPI)

router.post('/api/login',userController.loginAPI)

router.post('/api/admin',userController.loginAPI)

router.post('/api/driverRegister',driverController.driverRegisterAPI)

router.post('/api/driverLogin',driverController.driverLoginAPI)

router.get('/api/getUsersInAdmin',userController.getUsersInAdminAPI)

router.get('/api/getDriversInAdmin',driverController.getDriversInAdminAPI)

router.post('/api/addBooking',jwtMiddleware,BookingController.addBookingAPI)

//All Booking in Driver Dashboard
router.get('/api/getAllBookingsInDriver',BookingController.getAllBookingsInDriverAPI)


// Route to accept a booking
router.post('/api/bookings/:bookingId/accept', BookingController.acceptBooking)


//Booking history in driver Dashbiard
router.get('/api/driver/:driverId/currentBookings', BookingController.getCurrentBookingsByDriver);


//Accepted Driver Details
router.get('/api/user/:userId/bookings', BookingController.getUserBookings);


//Complete
router.patch('/api/bookings/complete/:id', BookingController.completeBooking);


router.put('/api/cancel/:bookingId', BookingController.cancelBooking);

router.get('/api/bookings/:userId', BookingController.getBookingsByUser);

//Accept driver
router.patch('/api/drivers/updateStatus/:driverId',driverController.updateDriverStatusAPI);

router.post('/api/paymentOrder', PaymentController.createOrder);

router.post('/api/paymentOrder/verify', PaymentController.verifyPayment);



module.exports = router