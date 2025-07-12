import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Server connected to MongoDB");
        
    }
    catch{
        console.error("Error connecting to database");
    }
}

export default connectDB;