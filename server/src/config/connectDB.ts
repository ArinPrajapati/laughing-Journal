import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (
      process.env.connectionUrl === null ||
      process.env.connectionUrl === undefined
    ) {
      throw new Error("MONGO_URI is not defined");
    }
    const conn = await mongoose.connect(process.env.connectionUrl!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
