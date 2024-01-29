import { asyncHandler } from "../utils/asyncHandler.js";
import { User,EditUser} from "../models/user.model.js"

import {generateOTP} from '../managers/otpManager.js'
import Jwt from 'jsonwebtoken'

const SendOtp = asyncHandler(async (req, res) => {
  try {
    const { mobile } = req.body;

    if(mobile<10){
      return res.status(400).send({status:'failed',message:"Mobile is not valid"})
    }
    // Check if the user already exists in the temporary collection (User)
    const existingUser = await User.findOne({ mobile });
      
    // Generate a new OTP
    const otp = generateOTP();
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration time

    if (existingUser) {
      // User already exists, send OTP for login
      await User.findOneAndUpdate({ mobile }, { otp, expirationTime });
      // TODO: Send the OTP to the user (via SMS or email)
      return res.status(200).json({ status: "success", message: "Logged in" });
    }

    // User doesn't exist in the temporary collection, create a new user
    const newUser = new User({ mobile, otp, expirationTime });
    await newUser.save();

    // TODO: Send the OTP to the user (via SMS or email)
    return res.status(201).json({ status: "success", message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const VerifyOtp = asyncHandler(async (req, res) => {
  try {
    const { mobile, enteredOtp } = req.body;

    // Retrieve the stored OTP from the temporary collection (User)
    const storedOtp = await User.findOne({ mobile });

    if (!storedOtp || storedOtp.expirationTime < Date.now()) {
      return res.status(400).json({ error: 'OTP expired or not sent' });
    }

    if (enteredOtp !== storedOtp.otp) {
      // Incorrect OTP
      return res.status(400).json({ error: 'Incorrect OTP' });
    } else {
      // Correct OTP

      // Get user details from the temporary collection (User)
      const userToUpdate = await User.findOne({ mobile });

      // Create a new user in the permanent collection (EditUser)
      const editUser = new EditUser({
        name: "",
        mobile: userToUpdate.mobile,
        gender: "",
        birthday: "",
        Languages: "",
        MatrialStatus: "",
        occupation: "",
        email:"",
        photoUrl:""
      });
      


      await editUser.save();

      // Remove the used OTP from the temporary collection (User)
      const secretKey = process.env.ACCESS_TOKEN_SECRET;
      await User.deleteOne({ mobile });
      const token = Jwt.sign({ userId: editUser._id }, secretKey, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

      return res.json({ message: 'OTP verified successfully', token: token });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




const ResendOtp = asyncHandler( async (req, res) => {

  const { mobile } = req.body;

  // Check if the user exists in the database
  const existingUser = await User.findOne({ mobile });

  if (!existingUser) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Check if the existing OTP is still valid
  if (existingUser.expirationTime > Date.now()) {
    return res.status(400).json({ error: 'Previous OTP is still valid' });
  }

  // Generate a new OTP
  const newOtp = generateOTP();

  

  // Update the user with the new OTP and reset expiration time
  await User.updateOne({ mobile }, { $set: { otp: newOtp, expirationTime: new Date(Date.now() + 5 * 60 * 1000) } });

  // TODO: Send the new OTP to the user (you can use a messaging service or send it via SMS)

  res.json({ message: 'New OTP sent successfully' });


})


const SigninWithGoogle=async(req,res)=>{
  try {
    const { name, email, photoUrl,googleId } = req.body;
    const existingUser = await EditUser.findOne({ googleId });
      console.log(existingUser)
    if (existingUser) {
      const updatedUser = await EditUser.findOneAndUpdate(
        { googleId },
        {
            $set: {
                name,
                email,
                photoUrl,
                googleId
            }
            // Additional fields that you may want to update can be added here
        },
        {
            new: true, // Return the modified document rather than the original
            upsert: true // If the document does not exist, insert a new one
        }
    );
        return res.status(200).json({ message: 'User data already exists' });
    }
    const temporaryMobileIdentifier = Math.floor(Math.random() * 1000000);

    // Save user data to MongoDB
    // const user = new EditUser({ name, email, photoUrl });
    const CreateUser={
   name,
      mobile:temporaryMobileIdentifier,
      gender:"",
      birthday:"",
     email:email,
      Languages:"",
      MatrialStatus:"",
      occupation:"",
     photoUrl:photoUrl,
     googleId:googleId
    }
   await EditUser.create(CreateUser);    
    res.status(200).json({ message: 'User data saved successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message});

}
}



export {
    SendOtp,VerifyOtp,ResendOtp,SigninWithGoogle
}