import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRouter from "./routes/chat.route.js"
import connectDB from "./lib/db.js"
import cookieParser from "cookie-parser"
//CORS
import cors from "cors"

// during deply
import path from "path"
const __dirname = path.resolve()

dotenv.config({
    path : "./env"
})

const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json()) //to access req just a simple object
app.use(cookieParser())
//CORS => cross origin resource sharing
//is a security mechanism that allows web browsers to make requests to a different domain than the one that served the webpage
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true //allow the frontend to send the cookie
}))


app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRouter)

// during deply
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

// app.get("/",(req,res)=>{
//     res.send("Hello world")
// })

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`)
    connectDB()
})