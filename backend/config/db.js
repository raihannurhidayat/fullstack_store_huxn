import mongoose from "mongoose";


const connectDB = async() => {
  try {
    // await mongoose.connect(process.env.MONGO_URI)
    await mongoose.connect("mongodb://127.0.0.1:27017/Store")
    console.log("Successfully connected")
  } catch (error) {
    console.log("ERROR ", error.message)
    process.exit(1)
  }
}

export default connectDB