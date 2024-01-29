import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use('/uploads', express.static(path.join(new URL(import.meta.url).pathname, 'uploads')));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/category.routes.js'
import businessRouter from './routes/business.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/business", businessRouter)



// http://localhost:8000/api/v1/users/register

export { app }