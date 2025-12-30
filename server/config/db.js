import mongoose from "mongoose";

const connectDB = async () => {
    console.log("connectDB() function called");

    try {
        if (!process.env.MONGO_URI) {
            console.error("Error: MONGO_URI is not defined in environment variables.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected", mongoose.connection.readyState);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
