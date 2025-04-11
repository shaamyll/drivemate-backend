require('dotenv').config();  // Always load dotenv at the top

const { twilio_SID, twilio_ACID, twilio_Token } = process.env;

const twilio = require('twilio');
const client = new twilio(twilio_ACID, twilio_Token, {
    lazyLoading: true
});

exports.sendOtp = async (req, res) => {
    const { phoneno } = req.body;
    try {
        const otpResponse = await client.verify.v2
            .services(twilio_SID)
            .verifications.create({
                to: `+91${phoneno}`,
                channel: "sms"
            });
        res.status(200).json({ message: "Otp sent successfully", otpResponse });
    } catch (err) {
        res.status(400).json(err);
    }
};


exports.verifyOtp = async(req,res)=>{
    const {phoneno,otp} = req.body

    try{

        const verifiedResponse = await client.verify.v2
        .services(twilio_SID)
        .verificationChecks.create({
            to: `+91${phoneno}`,
            code:otp
        })
        if (verifiedResponse.status === 'approved') {
            res.status(200).json({ message: "OTP verified successfully", verifiedResponse });
          } else {
            res.status(400).json({ message: "Invalid OTP", verifiedResponse });
          }
    } catch(err){
        res.status(400).send(err?.message||"Something went wrong");
    }
}
