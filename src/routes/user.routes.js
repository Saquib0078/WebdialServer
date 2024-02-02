const express =require( "express");
const { ResendOtp, SendOtp,SigninWithGoogle,VerifyOtp,getBroadcastMedia } =require("../controllers/user.controller.js");


const router = express.Router();




router.post("/send-otp",SendOtp)
router.post("/verify-otp",VerifyOtp)
router.post("/resend-otp",ResendOtp)
router.post("/SigninWithGoogle",SigninWithGoogle)




    


module.exports = router;