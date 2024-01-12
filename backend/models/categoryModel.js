import mongoose from "mongoose";

const categoryShchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxLengt: 32,
    unique: true
  }
})

export default mongoose.model("Category", categoryShchema)