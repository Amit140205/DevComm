import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongoDB connected to ${conn.connection.host}`)
    }catch(error){
        console.log("Error in connecting to mongoDB",error)
        process.exit(1) //1 means failure
    }
}

export default connectDB