import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION)
        console.log("mongoDB is successfully connected");
        
    } catch (error) {
        console.log("connection failed");
        process.exit(1);
        
    }
}
export default connectDB;