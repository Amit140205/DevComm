import { generateStreamToken } from "../lib/Stream.js"

export const getStreamToken = async (req,res) => {
    try{
        const token = await generateStreamToken(req.user._id)
        return res.status(200).json({token})
    }catch(error){
        console.log("Error in generateStreamToken controller : ",error.message)
        return res.status(500).json({message:"internal server error"})
    }
}