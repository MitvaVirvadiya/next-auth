import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to database");
        })

        connection.on("error", (error) => {
            console.log("Error while connecting to database", error);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something went wrong while connecting to database", error);
        process.exit(1);
    }
}