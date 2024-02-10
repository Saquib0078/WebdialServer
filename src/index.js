// require('dotenv').config({path: './env'})
const dotenv =require('dotenv')
// const connectDB =require("./db/index.js");
const fs=require('fs')
const mongoose=require('mongoose')
dotenv.config({
    path: './.env'
})


const express =require ("express")
const cors =require ("cors")
const cookieParser =require ("cookie-parser")
const path =require ("path")
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes const
const userRouter =require ('./routes/user.routes.js')
const categoryRouter =require ('./routes/category.routes.js')
const businessRouter =require ('./routes/business.routes.js')


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/business", businessRouter)



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI+"/WebDial");
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

// Middleware, routes, etc.

// Start the server
const startServer = async () => {
    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

startServer();










/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/