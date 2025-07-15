const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: Object, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    image: { type: String },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
