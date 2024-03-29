const mongoose =require("mongoose");
const { getIndianTime } =require ("../managers/timeManager.js");

const BusinessSchema=new mongoose.Schema({

    BusinessName: {
        type: String,
        required: true,
        trim: true, 
    },
    Pincode: {
        type: Number,
        required: true,
    },
    BuildingName: {
        type: String,
        required: true,
    },
    Colony: {
        type: String,
        required: true,
    },
    Area: {
        type: String,
        required: true,
    },
    Landmark: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time: {type: String, default:getIndianTime(), required: true}
},{
    timestamps:true
})

const business = mongoose.model("Business", BusinessSchema)

module.exports= 
{business}

