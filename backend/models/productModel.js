import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productShcema = mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    brand: { type: String, require: true },
    quantity: { type: Number, require: true },
    category: { type: ObjectId, ref: "Category", require: true },
    description: { type: String, require: true },
    reviews: [reviewSchema],
    rating: { type: Number, require: true, default: 0 },
    numReviews: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    countInStock: { type: Number, require: true, default: 0 },
    tes: {type: String, require: true}
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productShcema);

export default Product;
