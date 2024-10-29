import mongoose from 'mongoose'
const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://rameshyaazhnilayaazhnila:4EjnHrLFtbWs0026@cluster0.7iyk7.mongodb.net/luckily?retryWrites=true&w=majority&appName=Cluster0")
        console.log("mongoDB is successfully connected");
        
    } catch (error) {
        console.log("connection failed");
        process.exit(1);
        
    }
}
export default connectDB;