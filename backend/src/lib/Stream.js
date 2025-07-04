import {StreamChat} from "stream-chat"
import "dotenv/config" 

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.log("Stream apiKey or apiSecret is missing")
}

//need to interact/communicate with the stream application
const streamClient = StreamChat.getInstance(apiKey,apiSecret)

export const createOrUpdateStreamUser = async (userData)=>{
    try{
        await streamClient.upsertUsers([userData])
        return userData
    }catch(error){
        console.log("Error while creating Stream user")
    }
}

//****todo :
export const generateStreamToken = async (userId)=>{
    try{
        //ensure userId is a String
        const userIdStr = userId.toString()
        return streamClient.createToken(userIdStr)
    }catch(error){
        console.log("Error while generating stream token : ",error.message)
    }
} 
