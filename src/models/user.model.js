const mongoose =require( "mongoose");
const jwt =require( "jsonwebtoken")
const bcrypt =require( "bcrypt")
const { getIndianTime } =require( "../managers/timeManager.js");

const userSchema = new mongoose.Schema(
    {
        mobile: {
            type: Number,
            required: true,
            unique: true,
            trim: true, 
        },
        otp: {type: String, required: true, trim: true},
        time: {type: String, default:getIndianTime(), required: true}

    },
    {
        timestamps: true
    }
)

const UserMainSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
    },
    mobile: {
        type:Number,require: true, index:true, unique:true,sparse:true
    },
    gender: {
        type: String,
        trim: true, 
    },
    birthday: {
        type: String,
        trim: true, 
    },
    Languages: {
        type: String,
        trim: true, 
    },
    MatrialStatus: {
        type: String,
        trim: true, 
    },
    email: {
        type: String,
        trim: true, 
    },
    occupation: {
        type: String,
        trim: true, 
    },
    photoUrl:{
        type :String
    },
    googleId:{
        type :String

    },otp:{
        type:Number,
        default:0
    },expirationTime:{
        type:String
    }

},{timestamps:true})



userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

 const User = mongoose.model("UserOtp", userSchema)
 const EditUser=mongoose.model("User",UserMainSchema)


 module.exports= {User,EditUser}