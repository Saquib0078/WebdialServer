import { Router } from "express";
import { ResendOtp, SendOtp,SigninWithGoogle,VerifyOtp } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import{CreatePost} from '../controllers/category.controller.js'

const router = Router()



router.post("/send-otp",SendOtp)
router.post("/verify-otp",VerifyOtp)
router.post("/resend-otp",ResendOtp)
router.post("/SigninWithGoogle",SigninWithGoogle)




    


export default router