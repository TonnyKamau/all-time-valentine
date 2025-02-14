import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        mongoose.connection.setMaxListeners(25);
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connected to Database Successfully");
        })
        connection.on('error', (error) => {
            console.log("Something went wrong", error);
            process.exit(1);
        })
      
    } catch (error) {
        console.log("Something went wrong", error);
        console.log(error);
    }
}
