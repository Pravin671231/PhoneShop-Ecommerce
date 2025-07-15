const products = require("../data/ProductData.json");
const Product = require("../model/Product");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("../config/db");
connectDB();
const seederProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("Products Deleted");

    await Product.insertMany(products);
    console.log("All Products Added");
  } catch (error) {
    console.error(error.message);
  }
  process.exit(1);
};

seederProduct();
