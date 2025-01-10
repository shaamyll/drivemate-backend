const drivers = require("../Models/driverSchema");
const jwt = require("../Middlewares/jwtMiddleware")

exports.driverRegisterAPI = async (req, res) => {
    console.log("Inside Driver Register API");

    const { fullname, phoneno, city, licenseno, password } = req.body

    const existingDriver = await drivers.findOne({ phoneno })


    if (existingDriver) {
        res.status(402).json({ message: "Driver Already existing" })
    }
    else {
        const newDriver = new drivers({
            fullname: fullname,
            phoneno: phoneno,

            city: city,
            licenseno: licenseno,
            password: password
        })
        await newDriver.save()
        res.status(200).json("Driver registration successfull")
    }
}


exports.driverLoginAPI = async (req, res) => {
    console.log("Inside Login API");

    const { phoneno, password } = req.body;

    try {
        // Find the driver with the provided phoneno and password
        const existingDriver = await drivers.findOne({ phoneno, password });

        if (!existingDriver) {
            return res.status(404).json({ message: "Incorrect phone number or password" });
        }

        // Check the driver's status
        if (existingDriver.status === 'pending') {
            return res.status(403).json({ message: 'Your registration has not been approved yet.' });
        }

        if (existingDriver.status === 'rejected') {
            return res.status(403).json({ message: 'Your registration has been rejected. Please contact support.' });
        }

        // If status is 'accepted', allow login
        res.status(200).json({ currentDriver: existingDriver });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};






exports.getDriversInAdminAPI = async (req, res) => {
    try {
        const response = await drivers.find()
        res.status(200).json(response)
    }
    catch (err) {
        res.status(406).json(err)
    }
}

//Update driver status
exports.updateDriverStatusAPI = async (req, res) => {
    const { driverId } = req.params;
    const { status } = req.body;

    console.log('Driver ID:', driverId); 
    console.log('New Status:', status); // Log status for debugging

    try {
        // Find the driver by ID
        const driver = await drivers.findById(driverId);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        else{
                 // Update the driver's status field
        driver.status = status;

        // Save the updated driver
        await driver.save();

        // Respond with success
        res.status(200).json({ message: 'Driver status updated successfully', driver });
        }
   
    } catch (err) {
        console.error('Error occurred while updating driver status:', err); // Log full error
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};




