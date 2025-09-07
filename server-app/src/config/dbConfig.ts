import mongoose from "mongoose";

const connectDb = async() => {
    try{
         const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
         console.log("MongoDB connected:" , connect.connection.host);
    }
    catch(error){
      console.log(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
}

export default connectDb;