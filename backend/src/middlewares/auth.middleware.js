import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"

export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message : "no token provided"})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(401).json({message : "invalid token"})
        }

        const user = await User.findById(decode.userId).select("-password")

        req.user = user
        next()
    }catch(error){
        console.log("error in auth middleware : ",error)
        return res.status(500).json({message:"internal server error"})
    }
}