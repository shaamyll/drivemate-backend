const { Cursor } = require('mongoose')
const Razorpay = require('razorpay')
require('dotenv').config()
const crypto = require('crypto')

const razorPay = new Razorpay({
    key_id:process.env.RAZOPPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})



exports.createOrder = async(req,res)=>{


    const {amount} = req.body

    const amountPaise = amount*100

    const options = {
        amount:amountPaise,
        currency:"INR",
        receipt:crypto.randomBytes(5).toString('hex')
    }

   try{
    const order = await razorPay.orders.create(options)
    res.status(200).json({
        id:order.id,
        currency: options.currency,
        amount: options.amount,
        order
    })
   } catch(err){
    res.status(500).json(err)
   }

}



// Verify Razorpay Payment Signature
exports.verifyPayment = async (req, res) => {
    const { paymentId, orderId, signature,amount,currency } = req.body;
  
    // Step 1: Generate the signature from the Razorpay order_id and payment_id
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
  
    // Step 2: Verify the signature
    if (generatedSignature === signature) {
      try {
        res.status(200).send('Payment successful'); // Successful response to frontend
      } catch (error) {
        console.error('Error while saving payment:', error);
        res.status(500).send('Payment verification failed');
      }
    } else {
      console.log('Signature mismatch:', signature);
      res.status(400).send('Payment verification failed - Signature mismatch');
    }
  };
