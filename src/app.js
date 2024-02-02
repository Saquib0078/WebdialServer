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



// http://localhost:8000/api/v1/users/register

module.exports= { app }